/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Fallback local storage for preview environment
export const saveToHistory = async (userId: string, data: any) => {
  if (supabase) {
    const { error } = await supabase
      .from('generations')
      .insert([{ user_id: userId, data, created_at: new Date().toISOString() }]);
    if (error) console.error('Supabase save error:', error);
  } else {
    // Fallback to local storage
    const history = JSON.parse(localStorage.getItem('postafacil_history') || '[]');
    history.push({ id: Date.now().toString(), user_id: userId, data, created_at: new Date().toISOString() });
    localStorage.setItem('postafacil_history', JSON.stringify(history));
  }
};

export const getHistory = async (userId: string) => {
  if (supabase) {
    const { data, error } = await supabase
      .from('generations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }
    return data;
  } else {
    // Fallback to local storage
    const history = JSON.parse(localStorage.getItem('postafacil_history') || '[]');
    return history.filter((item: any) => item.user_id === userId).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
};
