# Quick Start Guide

Get your Property Management System up and running in minutes!

## 🚀 Immediate Setup (2 minutes)

The application is **already configured** and ready to use! The database is set up and the environment variables are configured.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Application
```bash
npm run dev
```

That's it! Open http://localhost:5173 in your browser.

## 🎯 First Steps

### 1. Create Your First Account
1. Click **"Register"** in the top navigation
2. Fill in:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
3. Click **"Create account"**
4. You're now logged in!

### 2. Add Your First Property
1. Click **"Add Property"** in the navigation
2. Fill in the details:
   ```
   Title: Modern 3-Bedroom House
   Description: Beautiful modern house with spacious rooms
   Price: 350000
   Location: Los Angeles, CA
   Property Type: House
   Status: Available
   Bedrooms: 3
   Bathrooms: 2
   Area: 2000
   ```
3. Add an image URL (free stock photo from Pexels):
   ```
   https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg
   ```
4. Click **"Add Property"**

### 3. Browse Properties
1. Go to the **Home** page
2. Use the search bar to find properties
3. Use filters to refine your search
4. Click on any property to see details

### 4. Try Key Features
- ❤️ Click the heart icon to add properties to favorites
- ⭐ Leave a review on a property detail page
- ✏️ Edit your properties from the property detail page
- 👤 Update your profile in the Profile section

## 🔐 Admin Features

To test admin features, you need to make your account an admin:

### Option 1: Using Supabase Dashboard
1. Go to https://supabase.com
2. Open your project
3. Go to **Table Editor** → **profiles**
4. Find your user and change `role` from `user` to `admin`
5. Refresh the application

### Option 2: Using SQL Editor (Recommended)
1. Go to Supabase Dashboard → SQL Editor
2. Run this query (replace with your email):
   ```sql
   UPDATE profiles
   SET role = 'admin'
   WHERE id = (
     SELECT id FROM auth.users WHERE email = 'john@example.com'
   );
   ```
3. Refresh the application
4. You'll now see the **"Admin"** link in navigation

### Admin Panel Features
- View all users and toggle their roles
- View all properties across the platform
- Delete any property listing
- See platform statistics

## 📸 Sample Property Images

Use these free Pexels URLs when adding properties:

### Houses
```
https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg
https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg
https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg
https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg
```

### Apartments
```
https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg
https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg
https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg
```

### Land
```
https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg
https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg
```

## 🧪 Testing the Application

### Test User Authentication
1. **Register** a new account
2. **Log out** (top right menu)
3. **Log in** with your credentials
4. Try accessing a protected page (like Add Property) without logging in

### Test Property Features
1. **Create** a property
2. **View** the property details
3. **Edit** the property
4. **Add to favorites**
5. **Leave a review**
6. **Delete** the property

### Test Search & Filters
1. Add multiple properties with different:
   - Types (house, apartment, land)
   - Prices
   - Locations
2. Test the search bar with keywords
3. Test filters (type, price range, status)

### Test Reviews
1. View a property you don't own
2. Click "Write a Review"
3. Rate the property (1-5 stars)
4. Add a comment
5. Submit the review

## 🐛 Common Issues & Solutions

### Issue: Can't see properties
**Solution**: Make sure you're logged in and have added properties

### Issue: Images not loading
**Solution**: Ensure you're using valid image URLs (try the Pexels URLs above)

### Issue: Can't access admin panel
**Solution**: Make sure your account role is set to 'admin' in the database

### Issue: Authentication errors
**Solution**: Check your internet connection and Supabase project status

### Issue: Build errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📱 Testing Responsive Design

1. **Desktop**: Use your browser normally
2. **Tablet**: Resize browser to ~768px width
3. **Mobile**: Resize browser to ~375px width or use browser DevTools mobile view

The application is fully responsive and works on all screen sizes!

## 🎨 Customization Ideas

Want to make it your own? Here are some ideas:

### Change Colors
Edit `tailwind.config.js` or update the color classes in components

### Add More Property Types
Update the `property_type` enum in the database and form options

### Add More Fields
Modify the database schema and forms to include:
- Property features (pool, garage, etc.)
- Year built
- HOA fees
- Virtual tour links

### Add Image Upload
Integrate Supabase Storage for direct image uploads instead of URLs

### Add Map Integration
Integrate Google Maps or Mapbox to show property locations

## 🚢 Deployment

### Option 1: Vercel (Recommended)
```bash
npm run build
# Upload the dist/ folder to Vercel
```

### Option 2: Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

### Option 3: Traditional Hosting
```bash
npm run build
# Upload contents of dist/ folder to your web host
```

## 📚 Next Steps

1. ✅ Complete the quick start above
2. 📖 Read the full README.md
3. 🏗️ Read ARCHITECTURE.md to understand the tech stack
4. 🎨 Customize the design to your liking
5. 🚀 Deploy to production

## 💡 Tips

- **Use Chrome DevTools** to debug any issues
- **Check the browser console** for error messages
- **Use the Network tab** to see API calls to Supabase
- **Experiment freely** - you can always reset the database

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check the Supabase Dashboard for database issues
3. Review the code in `src/` to understand the implementation
4. Check the database migrations in the Supabase SQL Editor

## 🎉 You're All Set!

You now have a fully functional Property Management System. Enjoy exploring and customizing it!
