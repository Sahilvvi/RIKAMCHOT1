export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attribute_definitions: {
        Row: {
          created_at: string
          id: string
          is_comparable: boolean
          is_filterable: boolean
          is_variant_option: boolean
          key: string
          label: string
          options: Json
          type: Database["public"]["Enums"]["attribute_type"]
          unit: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_comparable?: boolean
          is_filterable?: boolean
          is_variant_option?: boolean
          key: string
          label: string
          options?: Json
          type: Database["public"]["Enums"]["attribute_type"]
          unit?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_comparable?: boolean
          is_filterable?: boolean
          is_variant_option?: boolean
          key?: string
          label?: string
          options?: Json
          type?: Database["public"]["Enums"]["attribute_type"]
          unit?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          merchandising: Json
          name: string
          parent_id: string | null
          position: number
          seo: Json
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          merchandising?: Json
          name: string
          parent_id?: string | null
          position?: number
          seo?: Json
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          merchandising?: Json
          name?: string
          parent_id?: string | null
          position?: number
          seo?: Json
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_attributes: {
        Row: {
          attribute_id: string
          category_id: string
          is_required: boolean
          position: number
        }
        Insert: {
          attribute_id: string
          category_id: string
          is_required?: boolean
          position?: number
        }
        Update: {
          attribute_id?: string
          category_id?: string
          is_required?: boolean
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "category_attributes_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "attribute_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_attributes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          full_name: string
          id: string
          is_default: boolean
          label: string
          line1: string
          line2: string | null
          phone: string
          pincode: string
          state: string
          user_id: string
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          full_name: string
          id?: string
          is_default?: boolean
          label?: string
          line1: string
          line2?: string | null
          phone: string
          pincode: string
          state: string
          user_id: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          full_name?: string
          id?: string
          is_default?: boolean
          label?: string
          line1?: string
          line2?: string | null
          phone?: string
          pincode?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          kind: string
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          ai_confidence: number | null
          ai_recommended_size: string | null
          color: string | null
          id: string
          image: string | null
          name: string
          order_id: string
          price: number
          product_id: string
          qty: number
          size: string | null
          size_source: string | null
        }
        Insert: {
          ai_confidence?: number | null
          ai_recommended_size?: string | null
          color?: string | null
          id?: string
          image?: string | null
          name: string
          order_id: string
          price: number
          product_id: string
          qty: number
          size?: string | null
          size_source?: string | null
        }
        Update: {
          ai_confidence?: number | null
          ai_recommended_size?: string | null
          color?: string | null
          id?: string
          image?: string | null
          name?: string
          order_id?: string
          price?: number
          product_id?: string
          qty?: number
          size?: string | null
          size_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address: Json
          code: string
          coupon_code: string | null
          created_at: string
          delivery_method: string
          discount: number
          id: string
          notes: string | null
          payment_method: string
          points_earned: number
          shipping: number
          status: string
          subtotal: number
          tax: number
          total: number
          user_id: string
        }
        Insert: {
          address: Json
          code: string
          coupon_code?: string | null
          created_at?: string
          delivery_method: string
          discount?: number
          id?: string
          notes?: string | null
          payment_method: string
          points_earned?: number
          shipping?: number
          status?: string
          subtotal: number
          tax?: number
          total: number
          user_id: string
        }
        Update: {
          address?: Json
          code?: string
          coupon_code?: string | null
          created_at?: string
          delivery_method?: string
          discount?: number
          id?: string
          notes?: string | null
          payment_method?: string
          points_earned?: number
          shipping?: number
          status?: string
          subtotal?: number
          tax?: number
          total?: number
          user_id?: string
        }
        Relationships: []
      }
      points_ledger: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          points: number
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          points: number
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          points?: number
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_ledger_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attributes: {
        Row: {
          attribute_id: string
          product_id: string
          value: Json
        }
        Insert: {
          attribute_id: string
          product_id: string
          value: Json
        }
        Update: {
          attribute_id?: string
          product_id?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "product_attributes_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "attribute_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attributes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_media: {
        Row: {
          alt: string | null
          id: string
          kind: Database["public"]["Enums"]["media_kind"]
          poster_url: string | null
          position: number
          product_id: string
          url: string
        }
        Insert: {
          alt?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["media_kind"]
          poster_url?: string | null
          position?: number
          product_id: string
          url: string
        }
        Update: {
          alt?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["media_kind"]
          poster_url?: string | null
          position?: number
          product_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          compare_at_price: number | null
          created_at: string
          id: string
          is_active: boolean
          option_values: Json
          position: number
          price: number | null
          product_id: string
          sku: string
          stock: number
        }
        Insert: {
          compare_at_price?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          option_values?: Json
          position?: number
          price?: number | null
          product_id: string
          sku: string
          stock?: number
        }
        Update: {
          compare_at_price?: number | null
          created_at?: string
          id?: string
          is_active?: boolean
          option_values?: Json
          position?: number
          price?: number | null
          product_id?: string
          sku?: string
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          badges: string[]
          base_price: number
          brand_id: string | null
          category_id: string
          collection: string | null
          compare_at_price: number | null
          created_at: string
          currency: string
          description: string | null
          id: string
          legacy_id: string | null
          popularity: number
          published_at: string | null
          rating: number
          review_count: number
          seller_id: string | null
          seo: Json
          slug: string
          status: Database["public"]["Enums"]["product_status"]
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          badges?: string[]
          base_price: number
          brand_id?: string | null
          category_id: string
          collection?: string | null
          compare_at_price?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          legacy_id?: string | null
          popularity?: number
          published_at?: string | null
          rating?: number
          review_count?: number
          seller_id?: string | null
          seo?: Json
          slug: string
          status?: Database["public"]["Enums"]["product_status"]
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          badges?: string[]
          base_price?: number
          brand_id?: string | null
          category_id?: string
          collection?: string | null
          compare_at_price?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          legacy_id?: string | null
          popularity?: number
          published_at?: string | null
          rating?: number
          review_count?: number
          seller_id?: string | null
          seo?: Json
          slug?: string
          status?: Database["public"]["Enums"]["product_status"]
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string | null
          gender: string | null
          id: string
          phone: string | null
          style_prefs: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          phone?: string | null
          style_prefs?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          phone?: string | null
          style_prefs?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      size_choices: {
        Row: {
          category: string
          chosen_size: string
          confidence: number | null
          created_at: string
          id: string
          product_id: string
          recommended_size: string | null
          user_id: string
        }
        Insert: {
          category: string
          chosen_size: string
          confidence?: number | null
          created_at?: string
          id?: string
          product_id: string
          recommended_size?: string | null
          user_id: string
        }
        Update: {
          category?: string
          chosen_size?: string
          confidence?: number | null
          created_at?: string
          id?: string
          product_id?: string
          recommended_size?: string | null
          user_id?: string
        }
        Relationships: []
      }
      size_feedback: {
        Row: {
          category: string
          comment: string | null
          confidence: number | null
          created_at: string
          id: string
          kind: string
          product_id: string
          rating: number
          recommended_size: string | null
          suggestion: string | null
          user_id: string
        }
        Insert: {
          category: string
          comment?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          kind: string
          product_id: string
          rating: number
          recommended_size?: string | null
          suggestion?: string | null
          user_id: string
        }
        Update: {
          category?: string
          comment?: string | null
          confidence?: number | null
          created_at?: string
          id?: string
          kind?: string
          product_id?: string
          rating?: number
          recommended_size?: string | null
          suggestion?: string | null
          user_id?: string
        }
        Relationships: []
      }
      size_profiles: {
        Row: {
          chest_cm: number | null
          fit_pref: string | null
          height_cm: number | null
          notes: string | null
          updated_at: string
          user_id: string
          waist_cm: number | null
          weight_kg: number | null
        }
        Insert: {
          chest_cm?: number | null
          fit_pref?: string | null
          height_cm?: number | null
          notes?: string | null
          updated_at?: string
          user_id: string
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Update: {
          chest_cm?: number | null
          fit_pref?: string | null
          height_cm?: number | null
          notes?: string | null
          updated_at?: string
          user_id?: string
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      user_coupons: {
        Row: {
          code: string
          created_at: string
          description: string | null
          expires_at: string | null
          id: string
          title: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          title: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          title?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      attribute_type: "text" | "number" | "boolean" | "select" | "multiselect" | "dimension" | "color"
      app_role: "admin" | "moderator" | "user"
      media_kind: "image" | "video" | "image360" | "model_glb" | "model_usdz"
      product_status: "draft" | "pending" | "approved" | "rejected" | "suspended" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attribute_type: ["text", "number", "boolean", "select", "multiselect", "dimension", "color"],
      app_role: ["admin", "moderator", "user"],
      media_kind: ["image", "video", "image360", "model_glb", "model_usdz"],
      product_status: ["draft", "pending", "approved", "rejected", "suspended", "archived"],
    },
  },
} as const
