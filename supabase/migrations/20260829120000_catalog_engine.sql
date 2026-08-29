-- Catalog engine: attribute-driven, multi-category, seller-ready product model.
-- Phase 1 of the marketplace build. Replaces the hardcoded src/lib/shop-data.ts catalog.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE public.product_status AS ENUM (
  'draft', 'pending', 'approved', 'rejected', 'suspended', 'archived'
);

CREATE TYPE public.attribute_type AS ENUM (
  'text', 'number', 'boolean', 'select', 'multiselect', 'dimension', 'color'
);

CREATE TYPE public.media_kind AS ENUM (
  'image', 'video', 'image360', 'model_glb', 'model_usdz'
);

-- ---------------------------------------------------------------- categories

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  position INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  seo JSONB NOT NULL DEFAULT '{}'::jsonb,
  merchandising JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT categories_not_self_parent CHECK (parent_id IS DISTINCT FROM id)
);
CREATE INDEX categories_parent_idx ON public.categories(parent_id);

-- ------------------------------------------------------------------- brands

CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- --------------------------------------------------------------- attributes

CREATE TABLE public.attribute_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  type public.attribute_type NOT NULL,
  unit TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_filterable BOOLEAN NOT NULL DEFAULT true,
  is_comparable BOOLEAN NOT NULL DEFAULT false,
  is_variant_option BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.category_attributes (
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  attribute_id UUID NOT NULL REFERENCES public.attribute_definitions(id) ON DELETE CASCADE,
  is_required BOOLEAN NOT NULL DEFAULT false,
  position INT NOT NULL DEFAULT 0,
  PRIMARY KEY (category_id, attribute_id)
);

-- ----------------------------------------------------------------- products

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  -- Stable "rc-001" style handle carried over from the hardcoded catalog, so
  -- localStorage carts and wishlist_items.product_id keep resolving.
  legacy_id TEXT UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
  -- seller_id stays null until the vendor tables land in phase 2.
  seller_id UUID,
  collection TEXT,
  status public.product_status NOT NULL DEFAULT 'draft',
  base_price NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
  compare_at_price NUMERIC(10,2) CHECK (compare_at_price >= 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  badges TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INT NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  popularity INT NOT NULL DEFAULT 0,
  seo JSONB NOT NULL DEFAULT '{}'::jsonb,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX products_category_idx ON public.products(category_id);
CREATE INDEX products_status_idx ON public.products(status);
CREATE INDEX products_seller_idx ON public.products(seller_id);

CREATE TABLE public.product_attributes (
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  attribute_id UUID NOT NULL REFERENCES public.attribute_definitions(id) ON DELETE CASCADE,
  value JSONB NOT NULL,
  PRIMARY KEY (product_id, attribute_id)
);

CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT NOT NULL UNIQUE,
  -- { "size": "M", "color": "Black" } — keys are attribute_definitions.key
  option_values JSONB NOT NULL DEFAULT '{}'::jsonb,
  price NUMERIC(10,2) CHECK (price >= 0),
  compare_at_price NUMERIC(10,2) CHECK (compare_at_price >= 0),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  position INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX product_variants_product_idx ON public.product_variants(product_id);

CREATE TABLE public.product_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  kind public.media_kind NOT NULL DEFAULT 'image',
  url TEXT NOT NULL,
  poster_url TEXT,
  alt TEXT,
  position INT NOT NULL DEFAULT 0
);
CREATE INDEX product_media_product_idx ON public.product_media(product_id);

-- ---------------------------------------------------------------- updated_at

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER categories_touch BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Stub role helper so the migration is self-contained. A real roles table can
-- replace this when seller/admin portals are implemented.
CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT false;
$$;

-- ----------------------------------------------------------- grants and RLS

GRANT SELECT ON
  public.categories, public.brands, public.attribute_definitions,
  public.category_attributes, public.products, public.product_attributes,
  public.product_variants, public.product_media
  TO anon, authenticated;

GRANT ALL ON
  public.categories, public.brands, public.attribute_definitions,
  public.category_attributes, public.products, public.product_attributes,
  public.product_variants, public.product_media
  TO service_role;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attribute_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_media ENABLE ROW LEVEL SECURITY;

-- Reference data is world-readable; only admins may write it.
CREATE POLICY "categories_read" ON public.categories FOR SELECT USING (is_active);
CREATE POLICY "categories_admin_write" ON public.categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "brands_read" ON public.brands FOR SELECT USING (true);
CREATE POLICY "brands_admin_write" ON public.brands FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "attribute_definitions_read" ON public.attribute_definitions FOR SELECT USING (true);
CREATE POLICY "attribute_definitions_admin_write" ON public.attribute_definitions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "category_attributes_read" ON public.category_attributes FOR SELECT USING (true);
CREATE POLICY "category_attributes_admin_write" ON public.category_attributes FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only approved products are public. Admins see and write everything.
CREATE POLICY "products_read_approved" ON public.products FOR SELECT
  USING (status = 'approved');
CREATE POLICY "products_admin_all" ON public.products FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product_attributes_read_approved" ON public.product_attributes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_id AND p.status = 'approved'
  ));
CREATE POLICY "product_attributes_admin_all" ON public.product_attributes FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product_variants_read_approved" ON public.product_variants FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_id AND p.status = 'approved'
  ));
CREATE POLICY "product_variants_admin_all" ON public.product_variants FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "product_media_read_approved" ON public.product_media FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_id AND p.status = 'approved'
  ));
CREATE POLICY "product_media_admin_all" ON public.product_media FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
