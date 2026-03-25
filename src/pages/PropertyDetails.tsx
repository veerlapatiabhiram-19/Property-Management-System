import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart, CreditCard as Edit, Trash2, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { Loader } from '../components/Loader';
import { Database } from '../lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'] & {
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
};

type Review = Database['public']['Tables']['reviews']['Row'] & {
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
};

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (id) {
      fetchProperty();
      fetchReviews();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles:owner_id (
            full_name,
            avatar_url
          )
        `)
        .eq('id', id!)
        .maybeSingle();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('property_id', id!)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id!);

      if (error) throw error;
      navigate('/my-properties');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    try {
      await toggleFavorite(id!);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          property_id: id!,
          user_id: user.id,
          rating,
          comment,
        });

      if (error) throw error;
      setComment('');
      setRating(5);
      setShowReviewForm(false);
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  if (loading) return <Loader />;
  if (!property) return <div className="text-center py-12">Property not found</div>;

  const images = Array.isArray(property.images) ? property.images : [];
  const displayImages = images.length > 0 ? images : ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'];
  const isOwner = user?.id === property.owner_id;
  const canEdit = isOwner || profile?.role === 'admin';

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div>
              <div className="mb-4">
                <img
                  src={displayImages[selectedImage]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {displayImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${property.title} ${idx + 1}`}
                      onClick={() => setSelectedImage(idx)}
                      className={`h-20 object-cover rounded cursor-pointer ${
                        selectedImage === idx ? 'ring-2 ring-blue-600' : ''
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === 'available' ? 'bg-green-500 text-white' :
                    property.status === 'sold' ? 'bg-red-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                  <span className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                    {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {user && (
                    <button
                      onClick={handleFavorite}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <Heart
                        className={`h-6 w-6 ${isFavorite(id!) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                  )}
                  {canEdit && (
                    <>
                      <Link
                        to={`/edit-property/${id}`}
                        className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                      >
                        <Edit className="h-6 w-6 text-blue-600" />
                      </Link>
                      <button
                        onClick={handleDelete}
                        className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition"
                      >
                        <Trash2 className="h-6 w-6 text-red-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                ${property.price.toLocaleString()}
              </div>

              <div className="flex gap-6 mb-6">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bed className="h-6 w-6" />
                    <span className="text-lg">{property.bedrooms} Beds</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bath className="h-6 w-6" />
                    <span className="text-lg">{property.bathrooms} Baths</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Square className="h-6 w-6" />
                    <span className="text-lg">{property.area} sqft</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {property.profiles && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Listed By</h3>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {property.profiles.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{property.profiles.full_name}</p>
                      <p className="text-sm text-gray-600">Property Owner</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews ({reviews.length})
              {averageRating > 0 && (
                <span className="ml-3 text-lg text-gray-600">
                  <Star className="inline h-5 w-5 text-yellow-500 fill-yellow-500" />
                  {averageRating.toFixed(1)}
                </span>
              )}
            </h2>
            {user && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Write a Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRating(r)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          r <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Share your experience..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {review.profiles?.full_name.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{review.profiles?.full_name || 'User'}</p>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
