# Property Management System

A full-stack property management web application built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### User Features
- **User Authentication**: Secure registration and login with email/password
- **Browse Properties**: View all available properties with advanced search and filtering
- **Property Details**: Detailed property pages with image galleries, specifications, and reviews
- **Favorites**: Save favorite properties for easy access later
- **My Properties**: Manage your own property listings
- **Add/Edit Properties**: Create and update property listings with multiple images
- **Reviews & Ratings**: Leave reviews and ratings for properties
- **User Profile**: Manage your personal information

### Admin Features
- **Admin Dashboard**: Manage all users and properties
- **User Management**: View all users and toggle admin roles
- **Property Management**: Delete any property listing
- **Statistics**: View total users and properties

### Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Data**: Powered by Supabase for instant updates
- **Row Level Security**: Secure data access with Supabase RLS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean, professional design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, authentication, real-time)
- **Icons**: Lucide React
- **Routing**: React Router v6

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyList.tsx
│   ├── SearchBar.tsx
│   ├── FilterPanel.tsx
│   ├── Loader.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React Context providers
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
│   ├── useProperties.ts
│   └── useFavorites.ts
├── lib/                # Utilities and configurations
│   ├── supabase.ts
│   └── database.types.ts
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── PropertyDetails.tsx
│   ├── AddProperty.tsx
│   ├── EditProperty.tsx
│   ├── Favorites.tsx
│   ├── MyProperties.tsx
│   ├── Profile.tsx
│   ├── AdminPanel.tsx
│   └── NotFound.tsx
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Database Schema

### Tables

#### profiles
- `id` (uuid) - References auth.users
- `full_name` (text)
- `phone` (text)
- `avatar_url` (text)
- `role` (text) - 'user' or 'admin'
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### properties
- `id` (uuid)
- `title` (text)
- `description` (text)
- `price` (numeric)
- `location` (text)
- `property_type` (text) - 'land', 'house', or 'apartment'
- `bedrooms` (integer)
- `bathrooms` (integer)
- `area` (numeric)
- `images` (jsonb array)
- `status` (text) - 'available', 'sold', or 'pending'
- `owner_id` (uuid) - References profiles
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### favorites
- `id` (uuid)
- `user_id` (uuid) - References profiles
- `property_id` (uuid) - References properties
- `created_at` (timestamp)

#### reviews
- `id` (uuid)
- `property_id` (uuid) - References properties
- `user_id` (uuid) - References profiles
- `rating` (integer) - 1 to 5
- `comment` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd property-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Supabase Setup

The database schema is already set up. The environment variables in `.env` are already configured with your Supabase project credentials.

### 4. Run the Application

**Development Mode:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

**Production Build:**
```bash
npm run build
npm run preview
```

## Usage Guide

### For Regular Users

1. **Register an Account**
   - Click "Register" in the navigation
   - Fill in your full name, email, and password
   - Click "Create account"

2. **Browse Properties**
   - Visit the home page to see all properties
   - Use the search bar to find properties by location or keyword
   - Use filters to narrow results by type, price, and status

3. **View Property Details**
   - Click on any property card to see full details
   - View image gallery, specifications, and reviews
   - Add the property to favorites (heart icon)

4. **Add a Property**
   - Click "Add Property" in the navigation
   - Fill in all property details
   - Add image URLs from Pexels or other sources
   - Submit the listing

5. **Manage Your Properties**
   - Go to "My Properties" to see all your listings
   - Edit or delete your properties as needed

6. **Leave Reviews**
   - Visit any property detail page
   - Click "Write a Review"
   - Rate the property (1-5 stars) and leave a comment

### For Admin Users

1. **Access Admin Panel**
   - Admins will see an "Admin" link in the navigation
   - Click to access the admin dashboard

2. **Manage Users**
   - View all registered users
   - Toggle user roles between 'user' and 'admin'

3. **Manage Properties**
   - View all property listings
   - Delete any property if necessary

## Sample Data

To test the application with sample data, you can:

1. **Create a test account** and add properties manually
2. **Use Pexels.com** for free property images:
   - Search for "house", "apartment", or "land"
   - Copy the image URL
   - Paste it when adding/editing properties

Example property image URLs from Pexels:
- `https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg`
- `https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg`
- `https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg`

## Security Features

- **Authentication**: Secure email/password authentication via Supabase
- **Row Level Security**: Database-level security policies
- **Protected Routes**: Client-side route protection
- **Role-Based Access**: Admin-only features and pages

## API Endpoints (via Supabase)

All data operations are handled through Supabase's auto-generated REST API:

- **Properties**: CRUD operations on properties table
- **Favorites**: Add/remove favorites
- **Reviews**: Create, read, update, delete reviews
- **Profiles**: Update user profile information
- **Admin**: Manage users and properties (admin only)

## Troubleshooting

**Issue**: Application won't start
- **Solution**: Make sure all dependencies are installed with `npm install`

**Issue**: Can't log in or register
- **Solution**: Check that your Supabase project is active and the credentials in `.env` are correct

**Issue**: Properties not showing
- **Solution**: Make sure you're logged in and the database has data

**Issue**: Images not loading
- **Solution**: Ensure image URLs are valid and accessible

## License

This project is for educational purposes.

## Support

For issues or questions, please create an issue in the repository.
"# Property-Management-System" 
