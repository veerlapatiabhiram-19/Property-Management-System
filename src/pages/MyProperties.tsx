import { useState, useEffect } from 'react';
import { Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PropertyList } from '../components/PropertyList';
import { Loader } from '../components/Loader';
import { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

export function MyProperties() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          </div>
          <Link
            to="/add-property"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Add New Property
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <PropertyList
            properties={properties}
            emptyMessage="You haven't listed any properties yet. Start by adding your first property!"
          />
        )}
      </div>
    </div>
  );
}
