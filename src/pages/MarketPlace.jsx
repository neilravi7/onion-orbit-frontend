import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Star, Clock, Zap, Filter, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useSelector} from 'react-redux'

export default function Marketplace() {
  const { isAuthenticated:isUserAuthenticated, user:customer} = useSelector((state) => state.auth);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); // isUserAuthenticated
  const [user, setUser] = useState(customer);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: 'all',
    deliveryTime: 'all',
    offers: false
  });
  const sliderRef = useRef(null);

  // Mock categories data
  const categories = [
    { id: 1, name: 'Biryani', icon: '🍚' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Burger', icon: '🍔' },
    { id: 4, name: 'Chicken', icon: '🍗' },
    { id: 5, name: 'Dessert', icon: '🍰' },
    { id: 6, name: 'Beverages', icon: '☕' },
    { id: 7, name: 'Salad', icon: '🥗' },
    { id: 8, name: 'Soup', icon: '🍲' },
    { id: 9, name: 'Chinese', icon: '🥡' },
    { id: 10, name: 'Seafood', icon: '🦐' },
  ];

  // Mock restaurants data
  const restaurants = [
    {
      id: 1,
      name: 'Spice Route',
      rating: 4.5,
      reviews: 2340,
      deliveryTime: '25-30 mins',
      deliveryFee: 'Free',
      cuisines: ['North Indian', 'South Indian'],
      image: '/vendor-hero.jpg',
      offer: '50% off on first order',
      isPromoted: true
    },
    {
      id: 2,
      name: 'Pizza Hut',
      rating: 4.2,
      reviews: 1850,
      deliveryTime: '30-35 mins',
      deliveryFee: '₹40',
      cuisines: ['Pizza', 'Italian'],
      image: '/vendor-hero.jpg',
      offer: '30% off above ₹500',
      isPromoted: false
    },
    {
      id: 3,
      name: 'Burger King',
      rating: 4.3,
      reviews: 3210,
      deliveryTime: '20-25 mins',
      deliveryFee: 'Free',
      cuisines: ['Burgers', 'Fast Food'],
      image: '/vendor-hero.jpg',
      offer: '₹150 off on orders above ₹400',
      isPromoted: true
    },
    {
      id: 4,
      name: 'Taco Bell',
      rating: 4.1,
      reviews: 1560,
      deliveryTime: '25-30 mins',
      deliveryFee: '₹30',
      cuisines: ['Mexican', 'Fast Food'],
      image: '/vendor-hero.jpg',
      offer: null,
      isPromoted: false
    },
    {
      id: 5,
      name: 'Dosa Junction',
      rating: 4.6,
      reviews: 2890,
      deliveryTime: '15-20 mins',
      deliveryFee: 'Free',
      cuisines: ['South Indian', 'Dosa'],
      image: '/vendor-hero.jpg',
      offer: '40% off on first order',
      isPromoted: true
    },
    {
      id: 6,
      name: 'Biryani Express',
      rating: 4.4,
      reviews: 2150,
      deliveryTime: '30-35 mins',
      deliveryFee: '₹50',
      cuisines: ['Biryani', 'North Indian'],
      image: '/vendor-hero.jpg',
      offer: '25% off above ₹600',
      isPromoted: false
    },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? 'all' : value
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCartCount(0);
  };

  const handleLoginClick = () => {
    // Navigate to login - would use router in real app
    window.location.href = '/login';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        cartCount={cartCount}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
      />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-orange-50 to-orange-100 py-8 md:py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
            variants={itemVariants}
          >
            Discover the best food near you
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            className="flex gap-3 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl hover:from-orange-500 hover:to-orange-700 transition shadow-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">Filters</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white border-b border-gray-200 px-4 py-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Rating Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Rating</h3>
                  <div className="space-y-2">
                    {['all', '4.5+', '4+', '3.5+'].map((rating) => (
                      <label key={rating} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedFilters.rating === rating}
                          onChange={() => toggleFilter('rating', rating)}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-gray-700 font-medium">
                          {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Time Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Delivery Time</h3>
                  <div className="space-y-2">
                    {['all', '30', '45', '60'].map((time) => (
                      <label key={time} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryTime"
                          checked={selectedFilters.deliveryTime === time}
                          onChange={() => toggleFilter('deliveryTime', time)}
                          className="w-4 h-4 text-orange-500"
                        />
                        <span className="text-gray-700 font-medium">
                          {time === 'all' ? 'Any Time' : `Under ${time} mins`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Offers Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Offers</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.offers}
                      onChange={() => setSelectedFilters(prev => ({
                        ...prev,
                        offers: !prev.offers
                      }))}
                      className="w-4 h-4 text-orange-500 rounded"
                    />
                    <span className="text-gray-700 font-medium">Offers Only</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Cuisines Slider */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Cuisines</h2>
          <div className="relative">
            <motion.button
              onClick={scrollLeft}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </motion.button>

            <motion.button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </motion.button>

            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-orange-100 transition group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl group-hover:scale-110 transition">{category.icon}</div>
                  <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Restaurants Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Restaurants</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {restaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                {/* Restaurant Image */}
                <div className="relative h-40 overflow-hidden bg-gray-200">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  
                  {/* Promoted Badge */}
                  {restaurant.isPromoted && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Promoted
                    </div>
                  )}

                  {/* Offer Badge */}
                  {restaurant.offer && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs font-semibold">
                      {restaurant.offer}
                    </div>
                  )}
                </div>

                {/* Restaurant Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{restaurant.name}</h3>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <span className="text-sm font-bold text-orange-600">{restaurant.rating}</span>
                    </div>
                    <span className="text-xs text-gray-600">({restaurant.reviews.toLocaleString()})</span>
                  </div>

                  {/* Cuisines */}
                  <p className="text-sm text-gray-600 mb-3">
                    {restaurant.cuisines.join(', ')}
                  </p>

                  {/* Delivery Info */}
                  <div className="flex items-center justify-between text-xs text-gray-700 font-semibold">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-600" />
                      {restaurant.deliveryTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-gray-600" />
                      {restaurant.deliveryFee}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
