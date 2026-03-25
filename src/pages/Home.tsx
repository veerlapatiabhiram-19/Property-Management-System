import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { PropertyList } from '../components/PropertyList';
import { Loader } from '../components/Loader';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

export function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: string;
  }>({});

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [properties, searchQuery, filters]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let result = [...properties];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.property_type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.type) {
      result = result.filter((p) => p.property_type === filters.type);
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    setFilteredProperties(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-xl text-center mb-8 text-blue-100">
            Browse thousands of properties and find the perfect one for you
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredProperties.length} Properties Found
                  </h2>
                </div>
                <PropertyList
                  properties={filteredProperties}
                  emptyMessage="No properties match your search criteria."
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
