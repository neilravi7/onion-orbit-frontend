import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, LogOut, User, LogIn, UserPlus, Store, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, user, cartCount, onLogout, onLoginClick }) {
  const userSavedAddress = user.address;
  const primaryLocation = userSavedAddress.filter((location)=> location.is_primary === true)[0];
  // const [userPrimaryLocation, setUserPrimaryLocation] = useState(primaryLocation) 
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(primaryLocation);

  const locations = userSavedAddress ; //['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Miami'];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side - Logo & Location */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                🧅
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">FoodHub</span>
            </motion.div>

            {/* Location Bar - Desktop */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-lg">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">{selectedLocation.address}</span>
            </div>

            {/* Location Icon - Mobile */}
            <motion.button
              onClick={() => setShowLocationModal(true)}
              className="md:hidden p-2.5 hover:bg-gray-100 rounded-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5 text-orange-500" />
            </motion.button>
          </div>

          {/* Center - Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
            {isAuthenticated && user ? (
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setShowProfileMenu(true)}
                onHoverEnd={() => setShowProfileMenu(false)}
              >
                <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition">
                  <img
                    src={user?.profile_image || '/default-avatar.jpg'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-900">{user?.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden min-w-max"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link
                        to="/customer/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition text-gray-900 font-semibold"
                      >
                        <User className="w-4 h-4 text-orange-500" />
                        Profile
                      </Link>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-red-600 font-semibold border-t border-gray-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-4 py-2 text-orange-600 font-bold hover:bg-orange-50 rounded-lg transition"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-700 transition shadow-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-3">
            {/* Add Restaurant - Desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-gray-900 font-bold border-2 border-gray-300 rounded-lg hover:border-orange-400 hover:text-orange-600 transition"
            >
              <Store className="w-4 h-4" />
              Add Restaurant
            </motion.button>

            {/* Cart Icon - Desktop */}
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex relative p-2.5 hover:bg-gray-100 rounded-lg transition"
              >
                <ShoppingCart className="w-6 h-6 text-gray-900" />
                {cartCount > 0 && (
                  <motion.div
                    className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {cartCount}
                  </motion.div>
                )}
              </motion.button>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showMobileMenu ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="lg:hidden border-t border-gray-200 mt-4 pt-4 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Cart - Mobile */}
              {isAuthenticated && (
                <motion.button
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition font-semibold text-gray-900"
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-5 h-5 text-orange-500" />
                  Cart ({cartCount})
                </motion.button>
              )}

              {/* Profile / Auth - Mobile */}
              {isAuthenticated && user ? (
                <>
                  <Link
                    to="/customer/profile"
                    className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition text-gray-900 font-semibold"
                  >
                    <User className="w-5 h-5 text-orange-500" />
                    Profile
                  </Link>
                  <motion.button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition text-red-600 font-semibold"
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={onLoginClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-orange-600 font-bold border-2 border-orange-400 rounded-lg hover:bg-orange-50 transition"
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </motion.button>
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-700 transition shadow-lg"
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserPlus className="w-5 h-5" />
                    Sign Up
                  </motion.button>
                </>
              )}

              {/* Add Restaurant - Mobile */}
              <motion.button
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-gray-900 font-semibold"
                whileTap={{ scale: 0.95 }}
              >
                <Store className="w-5 h-5 text-orange-500" />
                Add Restaurant
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Location Selection Modal - Mobile */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLocationModal(false)}
          >
            <motion.div
              className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-md shadow-2xl"
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              exit={{ y: 500 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Location</h2>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <motion.button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.address)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold ${
                        selectedLocation.id === location.id
                          ? 'bg-orange-100 border-2 border-green-400 text-orange-600'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MapPin className="w-5 h-5" />
                      {location.address}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
