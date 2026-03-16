import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Package, AlertCircle, Clock, CheckCircle, XCircle, LogOut, Settings, UtensilsCrossed } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const orderTimelineData = [
  { time: '12:00 AM', orders: 20, delivered: 15 },
  { time: '2:00 AM', orders: 30, delivered: 25 },
  { time: '4:00 AM', orders: 25, delivered: 20 },
  { time: '6:00 AM', orders: 45, delivered: 40 },
  { time: '8:00 AM', orders: 65, delivered: 58 },
  { time: '10:00 AM', orders: 85, delivered: 78 },
  { time: '12:00 PM', orders: 95, delivered: 88 },
];

const recentOrders = [
  { id: '#24865113792', name: 'Pratik Sharma', amount: 'Rs. 205', status: 'Refund', reason: 'Order damaged' },
  { id: '#74850694030', name: 'Riyas Gupta', amount: 'Rs. 588', status: 'Cancelled', reason: 'Changed order' },
  { id: '#38495069383', name: 'Shreya nandan', amount: 'Rs. 459', status: 'Delivered', reason: 'Successfully delivered' },
];

const deliveryExecutives = [
  { id: 1, name: 'Arman Singh', phone: '+91 9033946890', avatar: '🚴' },
  { id: 2, name: 'Yogesh Pal', phone: '+91 9893525910', avatar: '🚴' },
  { id: 3, name: 'Aneesh Nair', phone: '+91 9133424345', avatar: '🚴' },
  { id: 4, name: 'Paamal Gupta', phone: '+91 9033926898', avatar: '🚴' },
];

export default function VendorDashboard() {
  const [restaurantData] = useState({
    name: 'Your Restaurant',
    totalOrders: 1456,
    fulfilledOrders: 1006,
    cancelledOrders: 400,
    refundOrders: 50,
    delayedOrders: 10,
  });

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      variants={itemVariants}
      className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${color}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('l-4', '')}/10`}>
          <Icon className={`w-6 h-6 ${color.replace('border-', 'text-').replace('l-4', '')}`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{restaurantData.name}</h1>
              <p className="text-sm text-gray-600">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-gray-100 rounded-xl transition">
              <Settings className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StatCard
            icon={Package}
            label="Total Orders"
            value={restaurantData.totalOrders}
            color="border-blue-500"
          />
          <StatCard
            icon={CheckCircle}
            label="Fulfilled Orders"
            value={restaurantData.fulfilledOrders}
            color="border-green-500"
          />
          <StatCard
            icon={XCircle}
            label="Cancelled Orders"
            value={restaurantData.cancelledOrders}
            color="border-red-500"
          />
          <StatCard
            icon={AlertCircle}
            label="Refund Orders"
            value={restaurantData.refundOrders}
            color="border-yellow-500"
          />
          <StatCard
            icon={Clock}
            label="Delayed Orders"
            value={restaurantData.delayedOrders}
            color="border-orange-500"
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Order Timeline Chart */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Order Timeline
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #ff7f00',
                    borderRadius: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#ff7f00"
                  strokeWidth={3}
                  dot={{ fill: '#ff7f00', r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="delivered"
                  stroke="#fb923c"
                  strokeWidth={2}
                  dot={{ fill: '#fb923c', r: 4 }}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Status Distribution */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Fulfilled', value: restaurantData.fulfilledOrders, fill: '#10b981' },
                    { name: 'Cancelled', value: restaurantData.cancelledOrders, fill: '#ef4444' },
                    { name: 'Refund', value: restaurantData.refundOrders, fill: '#f59e0b' },
                    { name: 'Delayed', value: restaurantData.delayedOrders, fill: '#ff7f00' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ff7f00" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Recent Orders */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              Recent Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Order</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Bill Total</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-4 px-4 text-gray-900 font-semibold">{order.id}</td>
                      <td className="py-4 px-4 text-gray-700">{order.name}</td>
                      <td className="py-4 px-4 text-gray-700 font-medium">{order.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-xs">{order.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Delivery Executives */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Executives</h2>
            <div className="space-y-4">
              {deliveryExecutives.map((exec) => (
                <motion.div
                  key={exec.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-xl border border-orange-200 hover:border-orange-400 transition cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-xl">
                    {exec.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{exec.name}</p>
                    <p className="text-xs text-gray-600">{exec.phone}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
