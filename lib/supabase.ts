import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupabaseClientOptions } from '@supabase/supabase-js';
import Constants from 'expo-constants';


const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig?.extra || {};

const options: SupabaseClientOptions<'public'> = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Important for native apps
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
