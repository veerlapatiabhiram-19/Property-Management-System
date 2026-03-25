import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('property_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data?.map(f => f.property_id) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (propertyId: string) => {
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, property_id: propertyId });

    if (error) throw error;
    setFavorites([...favorites, propertyId]);
  };

  const removeFavorite = async (propertyId: string) => {
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('property_id', propertyId);

    if (error) throw error;
    setFavorites(favorites.filter(id => id !== propertyId));
  };

  const toggleFavorite = async (propertyId: string) => {
    if (favorites.includes(propertyId)) {
      await removeFavorite(propertyId);
    } else {
      await addFavorite(propertyId);
    }
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite: (propertyId: string) => favorites.includes(propertyId),
  };
}
