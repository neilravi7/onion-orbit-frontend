import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Upload, MapPin, UtensilsCrossed, Store, User, Image as ImageIcon, X, Check, Loader } from 'lucide-react';

export default function VendorProfileSetup() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [step, setStep] = useState('details'); // 'details' or 'success'
  const [cuisines, setCuisines] = useState([]);
  const [cuisineInput, setCuisineInput] = useState('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: '',
      restaurantName: '',
      address: '',
      cuisineType: ''
    }
  });

  // Handle profile image upload
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage({
          preview: event.target.result,
          file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle restaurant image upload
  const handleRestaurantImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRestaurantImage({
          preview: event.target.result,
          file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cuisine type input
  const handleAddCuisine = () => {
    if (cuisineInput.trim() && !cuisines.includes(cuisineInput.trim())) {
      setCuisines([...cuisines, cuisineInput.trim()]);
      setCuisineInput('');
    }
  };

  const handleRemoveCuisine = (index) => {
    setCuisines(cuisines.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (cuisines.length === 0) {
      alert('Please add at least one cuisine type');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const formData = {
        name: data.name,
        restaurantName: data.restaurantName,
        address: data.address,
        cuisineType: cuisines, // Array of cuisines
        profileImage,
        restaurantImage
      };

      console.log('Vendor profile setup:', formData);
      // Example: POST to /api/vendor/profile
      // const response = await fetch('/api/vendor/profile', {
      //   method: 'POST',
      //   body: formDataToSend
      // });

      // Show success screen
      setStep('success');
    } catch (error) {
      console.error('Profile setup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (step === 'success') {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white flex items-center justify-center px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-full max-w-md text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Check className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Profile Complete!</h2>
          <p className="text-gray-600 mb-8">
            Your restaurant profile has been set up successfully. You can now access your dashboard.
          </p>
          <button
            onClick={() => window.location.href = '/vendor/dashboard'}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold rounded-xl transition shadow-lg"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Add your restaurant details to get started</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-8 space-y-8 shadow-xl border border-gray-200"
          variants={itemVariants}
        >
          {/* Personal Information Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Personal Information
            </h2>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Profile Image
                </label>
                <div className="relative">
                  {profileImage ? (
                    <div className="relative w-32 h-32 mx-auto">
                      <img
                        src={profileImage.preview}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setProfileImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition shadow-lg"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-32 mx-auto bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition">
                      <Upload className="w-6 h-6 text-orange-400 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Restaurant Information Section */}
          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Store className="w-5 h-5 text-orange-500" />
              Restaurant Information
            </h2>

            <div className="space-y-6">
              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  placeholder="Your restaurant name"
                  {...register('restaurantName', {
                    required: 'Restaurant name is required',
                    minLength: {
                      value: 2,
                      message: 'Restaurant name must be at least 2 characters'
                    }
                  })}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                />
                {errors.restaurantName && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errors.restaurantName.message}</p>
                )}
              </div>

              {/* Restaurant Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Restaurant Image
                </label>
                <div className="relative">
                  {restaurantImage ? (
                    <div className="relative">
                      <img
                        src={restaurantImage.preview}
                        alt="Restaurant"
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setRestaurantImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition shadow-lg"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition">
                      <ImageIcon className="w-8 h-8 text-orange-400 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">Upload restaurant image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleRestaurantImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  Address
                </label>
                <textarea
                  placeholder="Enter your restaurant address"
                  rows="3"
                  {...register('address', {
                    required: 'Address is required',
                    minLength: {
                      value: 5,
                      message: 'Address must be at least 5 characters'
                    }
                  })}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition resize-none"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errors.address.message}</p>
                )}
              </div>

              {/* Cuisine Types */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-orange-500" />
                  Cuisine Types (comma-separated)
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cuisineInput}
                      onChange={(e) => setCuisineInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCuisine();
                        }
                      }}
                      placeholder="e.g., South Indian"
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                    />
                    <button
                      type="button"
                      onClick={handleAddCuisine}
                      className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold rounded-lg transition shadow-lg"
                    >
                      Add
                    </button>
                  </div>

                  {/* Cuisine Tags */}
                  {cuisines.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cuisines.map((cuisine, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 bg-orange-100 border border-orange-300 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          {cuisine}
                          <button
                            type="button"
                            onClick={() => handleRemoveCuisine(index)}
                            className="hover:text-orange-900 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {cuisines.length === 0 && (
                    <p className="text-orange-600 text-sm font-medium">Please add at least one cuisine type</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Setting up profile...
              </>
            ) : (
              'Complete Setup'
            )}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
}
