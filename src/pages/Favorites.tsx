import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PropertyList } from '../components/PropertyList';
import { Loader } from '../components/Loader';
import { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

export function Favorites() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data: favorites, error: favError } = await supabase
        .from('favorites')
        .select('property_id')
        .eq('user_id', user.id);

      if (favError) throw favError;

      if (favorites && favorites.length > 0) {
        const propertyIds = favorites.map(f => f.property_id);
        const { data: properties, error: propError } = await supabase
          .from('properties')
          .select('*')
          .in('id', propertyIds);

        if (propError) throw propError;
        setProperties(properties || []);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <PropertyList
            properties={properties}
            emptyMessage="You haven't added any properties to your favorites yet."
          />
        )}
      </div>
    </div>
  );
}
