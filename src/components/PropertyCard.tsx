import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { Database } from '../lib/database.types';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(property.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    try {
      await toggleFavorite(property.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const images = Array.isArray(property.images) ? property.images : [];
  const mainImage = images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <Link to={`/property/${property.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              property.status === 'available' ? 'bg-green-500 text-white' :
              property.status === 'sold' ? 'bg-red-500 text-white' :
              'bg-yellow-500 text-white'
            }`}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </span>
          </div>
          {user && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <Heart
                className={`h-5 w-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
          )}
          <div className="absolute bottom-2 left-2">
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
              {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm line-clamp-1">{property.location}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.area} sqft</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              ${property.price.toLocaleString()}
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
