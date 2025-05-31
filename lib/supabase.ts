// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SupabaseClientOptions } from '@supabase/supabase-js';
// import Constants from 'expo-constants';
// import { createClient, processLock } from '@supabase/supabase-js';


// const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig?.extra || {};

// const options: SupabaseClientOptions<'public'> = {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false, // Important for native apps
//   },
// };

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//     lock: processLock,
//   },
// });
