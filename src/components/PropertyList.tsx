import { PropertyCard } from './PropertyCard';
import { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyListProps {
  properties: Property[];
  emptyMessage?: string;
}

export function PropertyList({ properties, emptyMessage = 'No properties found.' }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
