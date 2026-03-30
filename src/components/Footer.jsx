import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
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
    <motion.footer
      className="bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                🧅
              </div>
              <span className="text-2xl font-bold">FoodHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Delivering delicious meals to your doorstep. Fast, fresh, and reliable food delivery service.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  Press
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition font-semibold">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="font-semibold">1-800-FOODHUB</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="font-semibold">support@foodhub.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="font-semibold">India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-800 hover:bg-orange-500 rounded-full transition"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 pt-8"
          variants={itemVariants}
        >
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 FoodHub. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition text-sm font-semibold">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition text-sm font-semibold">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition text-sm font-semibold">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
