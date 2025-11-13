export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      core_values: {
        Row: {
          id: number
          title: string
          description: string
          icon: string
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          icon: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          icon?: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      haikus: {
        Row: {
          id: number
          line1: string
          line2: string
          line3: string
          theme: string
          category: 'philosophy' | 'science' | 'healing' | 'technology' | 'nature'
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          line1: string
          line2: string
          line3: string
          theme: string
          category: 'philosophy' | 'science' | 'healing' | 'technology' | 'nature'
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          line1?: string
          line2?: string
          line3?: string
          theme?: string
          category?: 'philosophy' | 'science' | 'healing' | 'technology' | 'nature'
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      key_sections: {
        Row: {
          id: number
          heading: string
          sub: string
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          heading: string
          sub: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          heading?: string
          sub?: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      people: {
        Row: {
          id: number
          name: string
          role: string
          avatar_url: string | null
          member_group: 'team' | 'advisor' | 'founder' | 'contributor' | 'guardian'
          gpt_description: string | null
          bio: string | null
          website: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          role: string
          avatar_url?: string | null
          member_group: 'team' | 'advisor' | 'founder' | 'contributor' | 'guardian'
          gpt_description?: string | null
          bio?: string | null
          website?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          role?: string
          avatar_url?: string | null
          member_group?: 'team' | 'advisor' | 'founder' | 'contributor' | 'guardian'
          gpt_description?: string | null
          bio?: string | null
          website?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          id: number
          key: string
          title: string | null
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          key: string
          title?: string | null
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          key?: string
          title?: string | null
          content?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tokenomics: {
        Row: {
          id: number
          category: string
          allocation_percentage: number
          vesting_details: string | null
          description: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          category: string
          allocation_percentage: number
          vesting_details?: string | null
          description?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          category?: string
          allocation_percentage?: number
          vesting_details?: string | null
          description?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      whitepaper_sections: {
        Row: {
          id: number
          title: string
          body: string
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          body: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          body?: string
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[keyof Database]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
