import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://uoeomqaelvgtzodifzhs.supabase.co';
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZW9tcWFlbHZndHpvZGlmemhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1Njc4MjIsImV4cCI6MTk5NjE0MzgyMn0.rFSohilx1duOvzqw0labdjcm9ofVQqI7950mgjTwZU4';  // Replace with your Supabase key

export const supabase: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
);

export default supabase;
