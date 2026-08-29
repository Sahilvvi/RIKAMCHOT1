-- Seed the catalog engine: category tree, attribute dictionary, and the 24
-- products previously hardcoded in src/lib/shop-data.ts.

-- ------------------------------------------------------------ category tree

INSERT INTO public.categories (slug, name, position, description) VALUES
  ('fashion',   'Fashion',    1, 'Clothing, footwear and accessories.'),
  ('tech',      'Technology', 2, 'Audio, wearables, gaming and everyday devices.'),
  ('lifestyle', 'Lifestyle',  3, 'Objects for the spaces you live in.');

INSERT INTO public.categories (slug, name, position, parent_id)
SELECT v.slug, v.name, v.position, (SELECT id FROM public.categories WHERE slug = v.parent)
FROM (VALUES
  ('t-shirts',             'T-Shirts',             1, 'fashion'),
  ('polos',                'Polos',                2, 'fashion'),
  ('hoodies',              'Hoodies',              3, 'fashion'),
  ('sweatshirts',          'Sweatshirts',          4, 'fashion'),
  ('bottoms',              'Bottoms',              5, 'fashion'),
  ('footwear',             'Footwear',             6, 'fashion'),
  ('accessories',          'Accessories',          7, 'fashion'),
  ('audio',                'Audio',                1, 'tech'),
  ('wearables',            'Wearables',            2, 'tech'),
  ('smartphones',          'Smartphones',          3, 'tech'),
  ('gaming',               'Gaming',               4, 'tech'),
  ('computer-accessories', 'Computer Accessories', 5, 'tech'),
  ('home',                 'Home',                 1, 'lifestyle'),
  ('lighting',             'Lighting',             2, 'lifestyle'),
  ('desk',                 'Desk',                 3, 'lifestyle'),
  ('travel',               'Travel',               4, 'lifestyle'),
  ('kitchen',              'Kitchen',              5, 'lifestyle')
) AS v(slug, name, position, parent);

-- ------------------------------------------------------- attribute dictionary

INSERT INTO public.attribute_definitions (key, label, type, unit, is_filterable, is_comparable, is_variant_option) VALUES
  -- shared
  ('size',         'Size',         'select',      NULL,   true,  false, true),
  ('color',        'Colour',       'color',       NULL,   true,  false, true),
  ('material',     'Material',     'text',        NULL,   true,  true,  false),
  -- fashion
  ('fit',          'Fit',          'select',      NULL,   true,  true,  false),
  ('fabric',       'Fabric',       'text',        NULL,   true,  true,  false),
  ('gsm',          'GSM',          'number',      'gsm',  true,  true,  false),
  ('care',         'Care',         'text',        NULL,   false, false, false),
  -- technology
  ('ram',          'RAM',          'number',      'GB',   true,  true,  false),
  ('storage',      'Storage',      'number',      'GB',   true,  true,  false),
  ('display',      'Display',      'text',        NULL,   false, true,  false),
  ('battery',      'Battery',      'number',      'mAh',  true,  true,  false),
  ('processor',    'Processor',    'text',        NULL,   true,  true,  false),
  ('connectivity', 'Connectivity', 'multiselect', NULL,   true,  true,  false),
  ('warranty',     'Warranty',     'text',        NULL,   false, true,  false),
  -- lifestyle
  ('dimensions',   'Dimensions',   'dimension',   'cm',   false, true,  false),
  ('finish',       'Finish',       'select',      NULL,   true,  true,  false),
  ('weight',       'Weight',       'number',      'kg',   true,  true,  false),
  ('assembly',     'Assembly',     'boolean',     NULL,   true,  false, false),
  ('room',         'Room',         'multiselect', NULL,   true,  false, false);

-- Attach the dictionary to each category subtree.
INSERT INTO public.category_attributes (category_id, attribute_id, is_required, position)
SELECT c.id, a.id, m.required, m.position
FROM (VALUES
  ('fashion',   'size',         true,  1),
  ('fashion',   'color',        true,  2),
  ('fashion',   'material',    true,  3),
  ('fashion',   'fit',          false, 4),
  ('fashion',   'fabric',       false, 5),
  ('fashion',   'gsm',          false, 6),
  ('fashion',   'care',         false, 7),
  ('tech',      'color',        false, 1),
  ('tech',      'ram',          false, 2),
  ('tech',      'storage',      false, 3),
  ('tech',      'display',      false, 4),
  ('tech',      'battery',      false, 5),
  ('tech',      'processor',    false, 6),
  ('tech',      'connectivity', false, 7),
  ('tech',      'warranty',     true,  8),
  ('lifestyle', 'material',     true,  1),
  ('lifestyle', 'color',        false, 2),
  ('lifestyle', 'dimensions',   true,  3),
  ('lifestyle', 'finish',       false, 4),
  ('lifestyle', 'weight',       false, 5),
  ('lifestyle', 'assembly',     false, 6),
  ('lifestyle', 'room',         false, 7)
) AS m(root, attr, required, position)
JOIN public.attribute_definitions a ON a.key = m.attr
JOIN public.categories root ON root.slug = m.root
JOIN public.categories c ON c.id = root.id OR c.parent_id = root.id;

-- --------------------------------------------------------------------- brand

INSERT INTO public.brands (slug, name, description)
VALUES ('rikamchot', 'RIKAMCHOT', 'The house label.');

-- --------------------------------------------------------------- products

WITH seed (legacy_id, slug, title, category_slug, collection, base_price, compare_at_price, badges, rating, review_count, popularity) AS (
  VALUES
    ('rc-001', 'monarch-oversized-tee', 'Monarch Oversized Tee', 't-shirts', 'Sovereign', 2499, 2999, ARRAY['new']::text[], 4.8, 214, 406),
    ('rc-002', 'crown-hoodie-ember', 'Crown Hoodie — Ember', 'hoodies', 'Sovereign', 4299, NULL, ARRAY['bestseller']::text[], 4.9, 512, 908),
    ('rc-003', 'sovereign-cargo-pant', 'Sovereign Cargo Pant', 'bottoms', 'Sovereign', 3899, NULL, ARRAY['limited']::text[], 4.7, 143, 331),
    ('rc-004', 'rc-monogram-cap', 'RC Monogram Cap', 'accessories', 'Heritage', 1499, NULL, ARRAY['new']::text[], 4.6, 88, 272),
    ('rc-005', 'regal-polo-gold-tip', 'Regal Polo — Gold Tip', 'polos', 'Heritage', 2799, NULL, ARRAY[]::text[], 4.7, 96, 284),
    ('rc-006', 'baroque-sweatshirt', 'Baroque Sweatshirt', 'sweatshirts', 'Atelier', 3699, 4299, ARRAY['limited']::text[], 4.9, 274, 470),
    ('rc-007', 'sovereign-jogger', 'Sovereign Jogger', 'bottoms', 'Sovereign', 3299, NULL, ARRAY['bestseller']::text[], 4.8, 331, 723),
    ('rc-008', 'neon-reign-sneaker', 'Neon Reign Sneaker', 'footwear', 'Atelier', 6999, 8499, ARRAY['limited']::text[], 4.9, 62, 258),
    ('rc-009', 'nocturne-oversized-tee', 'Nocturne Oversized Tee', 't-shirts', 'Nocturne', 2299, NULL, ARRAY[]::text[], 4.5, 51, 231),
    ('rc-010', 'heirloom-hoodie', 'Heirloom Hoodie', 'hoodies', 'Atelier', 4599, NULL, ARRAY['new']::text[], 4.8, 118, 310),
    ('rc-011', 'palace-trouser', 'Palace Trouser', 'bottoms', 'Heritage', 3599, NULL, ARRAY[]::text[], 4.6, 44, 228),
    ('rc-012', 'gilded-bucket-hat', 'Gilded Bucket Hat', 'accessories', 'Heritage', 1299, NULL, ARRAY[]::text[], 4.4, 27, 203),
    ('rc-013', 'coronation-tee', 'Coronation Tee', 't-shirts', 'Sovereign', 2599, NULL, ARRAY['bestseller']::text[], 4.9, 402, 798),
    ('rc-014', 'velour-track-pant', 'Velour Track Pant', 'bottoms', 'Nocturne', 3899, NULL, ARRAY[]::text[], 4.7, 71, 259),
    ('rc-015', 'empress-crewneck', 'Empress Crewneck', 'sweatshirts', 'Sovereign', 3199, 3799, ARRAY[]::text[], 4.7, 134, 322),
    ('rc-016', 'reign-high-top-sneaker', 'Reign High-Top Sneaker', 'footwear', 'Atelier', 7499, NULL, ARRAY['limited']::text[], 4.8, 39, 231),
    ('rc-017', 'signet-cap', 'Signet Cap', 'accessories', 'Nocturne', 1199, NULL, ARRAY[]::text[], 4.5, 21, 201),
    ('rc-018', 'ember-cargo-rose', 'Ember Cargo — Rose', 'bottoms', 'Atelier', 4199, NULL, ARRAY['limited']::text[], 4.6, 33, 217),
    ('rc-019', 'sanctum-polo', 'Sanctum Polo', 'polos', 'Nocturne', 2699, NULL, ARRAY['new']::text[], 4.5, 18, 198),
    ('rc-020', 'golden-fleece-hoodie', 'Golden Fleece Hoodie', 'hoodies', 'Atelier', 5199, 5899, ARRAY['limited']::text[], 4.9, 91, 287),
    ('rc-021', 'twilight-tee', 'Twilight Tee', 't-shirts', 'Nocturne', 2199, NULL, ARRAY[]::text[], 4.4, 24, 200),
    ('rc-022', 'regalia-jogger', 'Regalia Jogger', 'bottoms', 'Heritage', 3499, NULL, ARRAY['bestseller']::text[], 4.7, 189, 577),
    ('rc-023', 'crown-belt-bag', 'Crown Belt Bag', 'accessories', 'Atelier', 2299, NULL, ARRAY['new']::text[], 4.6, 12, 196),
    ('rc-024', 'court-sneaker-onyx', 'Court Sneaker — Onyx', 'footwear', 'Heritage', 6499, NULL, ARRAY[]::text[], 4.8, 56, 248)
)
INSERT INTO public.products (legacy_id, slug, title, category_id, brand_id, collection, status, base_price, compare_at_price, currency, badges, rating, review_count, popularity, published_at)
SELECT s.legacy_id, s.slug, s.title, c.id, b.id, s.collection, 'approved', s.base_price, s.compare_at_price, 'INR', s.badges, s.rating, s.review_count, s.popularity, now()
FROM seed s
JOIN public.categories c ON c.slug = s.category_slug
JOIN public.brands b ON b.slug = 'rikamchot';

-- ------------------------------------------------------- product attributes

WITH seed (legacy_id, material, colors) AS (
  VALUES
    ('rc-001', to_jsonb('Cotton 240gsm'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Gold","hex":"#c9a24c"}]'::jsonb),
    ('rc-002', to_jsonb('Fleece 340gsm'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Pink","hex":"#ff2f8f"}]'::jsonb),
    ('rc-003', to_jsonb('Ripstop Cotton'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-004', to_jsonb('Cotton Twill'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Wine","hex":"#5d1a2a"}]'::jsonb),
    ('rc-005', to_jsonb('Pique Cotton'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-006', to_jsonb('French Terry'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Gold","hex":"#c9a24c"}]'::jsonb),
    ('rc-007', to_jsonb('Tech Fleece'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-008', to_jsonb('Leather + Mesh'::text), '[{"name":"Pink","hex":"#ff2f8f"},{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-009', to_jsonb('Cotton 220gsm'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-010', to_jsonb('Fleece 380gsm'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Gold","hex":"#c9a24c"}]'::jsonb),
    ('rc-011', to_jsonb('Wool Blend'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-012', to_jsonb('Cotton Canvas'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Pink","hex":"#ff2f8f"}]'::jsonb),
    ('rc-013', to_jsonb('Cotton 240gsm'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Pink","hex":"#ff2f8f"}]'::jsonb),
    ('rc-014', to_jsonb('Velour'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-015', to_jsonb('Loopback Cotton'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-016', to_jsonb('Leather'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-017', to_jsonb('Cotton Twill'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-018', to_jsonb('Ripstop Cotton'::text), '[{"name":"Pink","hex":"#ff2f8f"}]'::jsonb),
    ('rc-019', to_jsonb('Pique Cotton'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-020', to_jsonb('Fleece 400gsm'::text), '[{"name":"Gold","hex":"#c9a24c"},{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-021', to_jsonb('Cotton 220gsm'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-022', to_jsonb('Tech Fleece'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb),
    ('rc-023', to_jsonb('Vegan Leather'::text), '[{"name":"Black","hex":"#0a0a0b"},{"name":"Gold","hex":"#c9a24c"}]'::jsonb),
    ('rc-024', to_jsonb('Leather'::text), '[{"name":"Black","hex":"#0a0a0b"}]'::jsonb)
)
INSERT INTO public.product_attributes (product_id, attribute_id, value)
SELECT p.id, a.id, s.material
FROM seed s
JOIN public.products p ON p.legacy_id = s.legacy_id
JOIN public.attribute_definitions a ON a.key = 'material'
UNION ALL
SELECT p.id, a.id, s.colors
FROM seed s
JOIN public.products p ON p.legacy_id = s.legacy_id
JOIN public.attribute_definitions a ON a.key = 'color';

-- ---------------------------------------------------------- product variants

WITH seed (legacy_id, size, position, stock) AS (
  VALUES
    ('rc-001', 'S', 0, 25),
    ('rc-001', 'M', 1, 25),
    ('rc-001', 'L', 2, 25),
    ('rc-001', 'XL', 3, 25),
    ('rc-001', 'XXL', 4, 25),
    ('rc-002', 'S', 0, 25),
    ('rc-002', 'M', 1, 25),
    ('rc-002', 'L', 2, 25),
    ('rc-002', 'XL', 3, 25),
    ('rc-003', '28', 0, 25),
    ('rc-003', '30', 1, 25),
    ('rc-003', '32', 2, 25),
    ('rc-003', '34', 3, 25),
    ('rc-003', '36', 4, 25),
    ('rc-004', 'One', 0, 25),
    ('rc-005', 'S', 0, 25),
    ('rc-005', 'M', 1, 25),
    ('rc-005', 'L', 2, 25),
    ('rc-005', 'XL', 3, 25),
    ('rc-006', 'M', 0, 25),
    ('rc-006', 'L', 1, 25),
    ('rc-006', 'XL', 2, 25),
    ('rc-007', 'S', 0, 25),
    ('rc-007', 'M', 1, 25),
    ('rc-007', 'L', 2, 25),
    ('rc-007', 'XL', 3, 25),
    ('rc-008', '7', 0, 0),
    ('rc-008', '8', 1, 0),
    ('rc-008', '9', 2, 0),
    ('rc-008', '10', 3, 0),
    ('rc-008', '11', 4, 0),
    ('rc-009', 'S', 0, 25),
    ('rc-009', 'M', 1, 25),
    ('rc-009', 'L', 2, 25),
    ('rc-009', 'XL', 3, 25),
    ('rc-009', 'XXL', 4, 25),
    ('rc-010', 'S', 0, 25),
    ('rc-010', 'M', 1, 25),
    ('rc-010', 'L', 2, 25),
    ('rc-010', 'XL', 3, 25),
    ('rc-011', '28', 0, 25),
    ('rc-011', '30', 1, 25),
    ('rc-011', '32', 2, 25),
    ('rc-011', '34', 3, 25),
    ('rc-012', 'One', 0, 25),
    ('rc-013', 'S', 0, 25),
    ('rc-013', 'M', 1, 25),
    ('rc-013', 'L', 2, 25),
    ('rc-013', 'XL', 3, 25),
    ('rc-014', 'S', 0, 25),
    ('rc-014', 'M', 1, 25),
    ('rc-014', 'L', 2, 25),
    ('rc-014', 'XL', 3, 25),
    ('rc-015', 'S', 0, 25),
    ('rc-015', 'M', 1, 25),
    ('rc-015', 'L', 2, 25),
    ('rc-016', '7', 0, 25),
    ('rc-016', '8', 1, 25),
    ('rc-016', '9', 2, 25),
    ('rc-016', '10', 3, 25),
    ('rc-016', '11', 4, 25),
    ('rc-017', 'One', 0, 25),
    ('rc-018', '30', 0, 0),
    ('rc-018', '32', 1, 0),
    ('rc-018', '34', 2, 0),
    ('rc-019', 'S', 0, 25),
    ('rc-019', 'M', 1, 25),
    ('rc-019', 'L', 2, 25),
    ('rc-019', 'XL', 3, 25),
    ('rc-020', 'M', 0, 25),
    ('rc-020', 'L', 1, 25),
    ('rc-020', 'XL', 2, 25),
    ('rc-021', 'S', 0, 25),
    ('rc-021', 'M', 1, 25),
    ('rc-021', 'L', 2, 25),
    ('rc-021', 'XL', 3, 25),
    ('rc-021', 'XXL', 4, 25),
    ('rc-022', 'S', 0, 25),
    ('rc-022', 'M', 1, 25),
    ('rc-022', 'L', 2, 25),
    ('rc-022', 'XL', 3, 25),
    ('rc-023', 'One', 0, 25),
    ('rc-024', '8', 0, 25),
    ('rc-024', '9', 1, 25),
    ('rc-024', '10', 2, 25),
    ('rc-024', '11', 3, 25)
)
INSERT INTO public.product_variants (product_id, sku, option_values, price, stock, position)
SELECT p.id, 'RC-' || regexp_replace(s.legacy_id, '^rc-', '') || '-' || regexp_replace(upper(s.size), '[^A-Z0-9]', '', 'g'), jsonb_build_object('size', s.size), NULL, s.stock, s.position
FROM seed s
JOIN public.products p ON p.legacy_id = s.legacy_id;

-- ------------------------------------------------------------- product media

WITH seed (legacy_id, url, alt) AS (
  VALUES
    ('rc-001', '/products/product-1.jpg', 'Monarch Oversized Tee'),
    ('rc-002', '/products/product-2.jpg', 'Crown Hoodie — Ember'),
    ('rc-003', '/products/product-3.jpg', 'Sovereign Cargo Pant'),
    ('rc-004', '/products/product-4.jpg', 'RC Monogram Cap'),
    ('rc-005', '/products/product-5.jpg', 'Regal Polo — Gold Tip'),
    ('rc-006', '/products/product-6.jpg', 'Baroque Sweatshirt'),
    ('rc-007', '/products/product-7.jpg', 'Sovereign Jogger'),
    ('rc-008', '/products/product-8.jpg', 'Neon Reign Sneaker'),
    ('rc-009', '/products/product-1.jpg', 'Nocturne Oversized Tee'),
    ('rc-010', '/products/product-2.jpg', 'Heirloom Hoodie'),
    ('rc-011', '/products/product-3.jpg', 'Palace Trouser'),
    ('rc-012', '/products/product-4.jpg', 'Gilded Bucket Hat'),
    ('rc-013', '/products/product-5.jpg', 'Coronation Tee'),
    ('rc-014', '/products/product-6.jpg', 'Velour Track Pant'),
    ('rc-015', '/products/product-7.jpg', 'Empress Crewneck'),
    ('rc-016', '/products/product-8.jpg', 'Reign High-Top Sneaker'),
    ('rc-017', '/products/product-1.jpg', 'Signet Cap'),
    ('rc-018', '/products/product-2.jpg', 'Ember Cargo — Rose'),
    ('rc-019', '/products/product-3.jpg', 'Sanctum Polo'),
    ('rc-020', '/products/product-4.jpg', 'Golden Fleece Hoodie'),
    ('rc-021', '/products/product-5.jpg', 'Twilight Tee'),
    ('rc-022', '/products/product-6.jpg', 'Regalia Jogger'),
    ('rc-023', '/products/product-7.jpg', 'Crown Belt Bag'),
    ('rc-024', '/products/product-8.jpg', 'Court Sneaker — Onyx')
)
INSERT INTO public.product_media (product_id, kind, url, position, alt)
SELECT p.id, 'image', s.url, 0, s.alt
FROM seed s
JOIN public.products p ON p.legacy_id = s.legacy_id;
