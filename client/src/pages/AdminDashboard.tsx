import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

interface AdminStats {
  totalFarmers: number;
  totalEquipment: number;
  activeBookings: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState<AdminStats>({
    totalFarmers: 2547,
    totalEquipment: 1293,
    activeBookings: 156,
    totalRevenue: 547890
  });

  // Check if user is admin (in production, this would be validated server-side)
  useEffect(() => {
    if (!user) {
      setLocation('/login');
      return;
    }
    
    // In production, check user.isAdmin from Firestore
    // For demo purposes, we'll assume admin access
  }, [user, setLocation]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your agricultural equipment marketplace</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Last updated: 2 minutes ago</span>
              <button className="text-forest-green hover:text-sage-green">
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-forest-green to-sage-green text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Farmers</p>
                  <p className="text-3xl font-bold">{stats.totalFarmers.toLocaleString()}</p>
                </div>
                <i className="fas fa-users text-4xl text-green-100"></i>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-sandy-brown to-saddle-brown text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Equipment Listed</p>
                  <p className="text-3xl font-bold">{stats.totalEquipment.toLocaleString()}</p>
                </div>
                <i className="fas fa-tractor text-4xl text-orange-100"></i>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Bookings</p>
                  <p className="text-3xl font-bold">{stats.activeBookings}</p>
                </div>
                <i className="fas fa-calendar-check text-4xl text-blue-100"></i>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Revenue (₹)</p>
                  <p className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <i className="fas fa-rupee-sign text-4xl text-purple-100"></i>
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">User Management</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-users text-forest-green mr-3"></i>
                  Manage Users
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-ban text-red-500 mr-3"></i>
                  Suspend Users
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-chart-bar text-blue-500 mr-3"></i>
                  User Analytics
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Equipment Management</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-list text-forest-green mr-3"></i>
                  Review Listings
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-flag text-orange-500 mr-3"></i>
                  Flagged Content
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-trash text-red-500 mr-3"></i>
                  Remove Listings
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">System Management</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-comments text-forest-green mr-3"></i>
                  Monitor Chats
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-bell text-blue-500 mr-3"></i>
                  Send Notifications
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <i className="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                  Handle Disputes
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user-plus text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium">New farmer registered</p>
                    <p className="text-sm text-gray-600">Rajesh Kumar from Pune</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">5 minutes ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-tractor text-blue-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium">Equipment listed</p>
                    <p className="text-sm text-gray-600">John Deere Tractor in Nashik</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">12 minutes ago</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-rupee-sign text-purple-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium">Payment completed</p>
                    <p className="text-sm text-gray-600">₹3,500 for tractor rental</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">25 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
