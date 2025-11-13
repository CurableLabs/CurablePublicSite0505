/**
 * Supabase Data Hooks
 *
 * Custom React Query hooks for fetching data from Supabase
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

// ============================================================================
// PEOPLE HOOKS
// ============================================================================

export function usePeople() {
  return useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Tables<'people'>[];
    },
  });
}

export function usePeopleByGroup(group: 'team' | 'advisor' | 'founder' | 'contributor' | 'guardian') {
  return useQuery({
    queryKey: ['people', group],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .eq('member_group', group)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Tables<'people'>[];
    },
  });
}

export function useFounders() {
  return usePeopleByGroup('founder');
}

export function useTeam() {
  return usePeopleByGroup('team');
}

export function useAdvisors() {
  return usePeopleByGroup('advisor');
}

export function useGuardians() {
  return usePeopleByGroup('guardian');
}

// ============================================================================
// HAIKUS HOOKS
// ============================================================================

export function useHaikus() {
  return useQuery({
    queryKey: ['haikus'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('haikus')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Tables<'haikus'>[];
    },
  });
}

export function useHaikusByCategory(category: 'philosophy' | 'science' | 'healing' | 'technology' | 'nature') {
  return useQuery({
    queryKey: ['haikus', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('haikus')
        .select('*')
        .eq('category', category)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Tables<'haikus'>[];
    },
  });
}

// ============================================================================
// CORE VALUES HOOKS
// ============================================================================

export function useCoreValues() {
  return useQuery({
    queryKey: ['core_values'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('core_values')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Tables<'core_values'>[];
    },
  });
}

// ============================================================================
// WHITEPAPER SECTIONS HOOKS
// ============================================================================

export function useWhitepaperSections() {
  return useQuery({
    queryKey: ['whitepaper_sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('whitepaper_sections')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Tables<'whitepaper_sections'>[];
    },
  });
}

// ============================================================================
// KEY SECTIONS HOOKS
// ============================================================================

export function useKeySections() {
  return useQuery({
    queryKey: ['key_sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('key_sections')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Tables<'key_sections'>[];
    },
  });
}

// ============================================================================
// TOKENOMICS HOOKS
// ============================================================================

export function useTokenomics() {
  return useQuery({
    queryKey: ['tokenomics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tokenomics')
        .select('*')
        .order('display_order', { ascending: true});

      if (error) throw error;
      return data as Tables<'tokenomics'>[];
    },
  });
}

// ============================================================================
// SITE CONTENT HOOKS
// ============================================================================

export function useSiteContent(key: string) {
  return useQuery({
    queryKey: ['site_content', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('key', key)
        .single();

      if (error) throw error;
      return data as Tables<'site_content'>;
    },
  });
}

// ============================================================================
// HELPER TYPE - Convert Haiku from DB format to app format
// ============================================================================

export type HaikuAppFormat = {
  id: number;
  lines: [string, string, string];
  theme: string;
  category: 'philosophy' | 'science' | 'healing' | 'technology' | 'nature';
};

export function convertHaikuToAppFormat(haiku: Tables<'haikus'>): HaikuAppFormat {
  return {
    id: haiku.id,
    lines: [haiku.line1, haiku.line2, haiku.line3],
    theme: haiku.theme,
    category: haiku.category,
  };
}

// ============================================================================
// HELPER TYPE - Convert Person from DB format to app format
// ============================================================================

export type PersonAppFormat = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  group: 'team' | 'advisor' | 'founder' | 'contributor' | 'guardian';
  gptDescription?: string;
  bio?: string;
  website?: string;
};

export function convertPersonToAppFormat(person: Tables<'people'>): PersonAppFormat {
  return {
    id: person.id,
    name: person.name,
    role: person.role,
    avatar: person.avatar_url || '',
    group: person.member_group,
    gptDescription: person.gpt_description || undefined,
    bio: person.bio || undefined,
    website: person.website || undefined,
  };
}
