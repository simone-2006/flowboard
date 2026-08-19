import { supabase } from '../utils/supabase';

export async function listProfiles() {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, surname, role');

    if (error) throw error;
    return data ?? [];
}

export async function getProfileById(id) {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, surname, role')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}
