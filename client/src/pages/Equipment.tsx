import { useState, useEffect } from 'react';
import { Equipment } from '@shared/schema';
import EquipmentCard from '@/components/EquipmentCard';
import BookingModal from '@/components/BookingModal';
import ChatInterface from '@/components/ChatInterface';
import LocationSelector from '@/components/LocationSelector';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<{ id: string; name: string } | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    state: 'all',
    city: 'all',
    priceRange: 'all',
    availability: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock equipment data
  useEffect(() => {
    const mockEquipment: Equipment[] = [
      {
        id: '1',
        ownerId: 'owner1',
        name: 'Mahindra 575 DI Tractor',
        description: '50 HP tractor suitable for farming operations. Well maintained and fuel efficient.',
        category: 'Tractors',
        state: 'Maharashtra',
        city: 'Pune',
        location: 'Khadki area, near agricultural market',
        hourlyRate: 500,
        dailyRate: 3500,
        images: ['https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'],
        availability: [],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: '2',
        ownerId: 'owner2',
        name: 'John Deere Combine Harvester',
        description: 'High-efficiency combine harvester for wheat and rice. Latest model with GPS guidance.',
        category: 'Harvesters',
        state: 'Maharashtra',
        city: 'Nashik',
        location: 'Sinnar Road, Industrial Area',
        hourlyRate: 2000,
        dailyRate: 12000,
        images: [],
        availability: [],
        isActive: false,
        createdAt: new Date(),
      },
      {
        id: '3',
        ownerId: 'owner3',
        name: 'Drip Irrigation System',
        description: 'Complete drip irrigation setup for 5-acre coverage. Water-efficient and automated.',
        category: 'Irrigation',
        state: 'Maharashtra',
        city: 'Aurangabad',
        location: 'MIDC Area, Phase 2',
        hourlyRate: 200,
        dailyRate: 1500,
        images: ['https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'],
        availability: [],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: '4',
        ownerId: 'owner4',
        name: 'Kubota Rotary Tiller',
        description: 'Heavy-duty rotary tiller for soil preparation. Perfect for preparing seedbeds.',
        category: 'Tillage',
        state: 'Maharashtra',
        city: 'Mumbai',
        location: 'Bandra East, Agricultural Hub',
        hourlyRate: 300,
        dailyRate: 2000,
        images: [],
        availability: [],
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: '5',
        ownerId: 'owner5',
        name: 'Seed Drill Machine',
        description: 'Precision seed drill for accurate seed placement. Suitable for various crops.',
        category: 'Seeding',
        state: 'Maharashtra',
        city: 'Kolhapur',
        location: 'Panchganga Area, Farmer Cooperative',
        hourlyRate: 400,
        dailyRate: 2800,
        images: [],
        availability: [],
        isActive: true,
        createdAt: new Date(),
      }
    ];
    setEquipment(mockEquipment);
    setFilteredEquipment(mockEquipment);
  }, []);

  // Filter equipment based on filters and search
  useEffect(() => {
    let filtered = equipment;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // State filter
    if (filters.state !== 'all') {
      filtered = filtered.filter(item => 
        item.state.toLowerCase() === filters.state.toLowerCase()
      );
    }

    // City filter
    if (filters.city !== 'all') {
      filtered = filtered.filter(item => 
        item.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Availability filter
    if (filters.availability === 'available') {
      filtered = filtered.filter(item => item.isActive);
    } else if (filters.availability === 'booked') {
      filtered = filtered.filter(item => !item.isActive);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(item => 
        item.hourlyRate >= min && (max ? item.hourlyRate <= max : true)
      );
    }

    setFilteredEquipment(filtered);
  }, [equipment, filters, searchTerm]);

  const handleBookEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsBookingModalOpen(true);
  };

  const handleBook = (booking: any) => {
    console.log('Booking submitted:', booking);
    setIsBookingModalOpen(false);
  };

  const handleChat = (ownerId: string) => {
    setChatRecipient({ id: ownerId, name: "Equipment Owner" });
  };

  const handleViewDetails = (equipment: Equipment) => {
    console.log('View details for:', equipment.name);
  };

  return (
    <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
              Agricultural Equipment Marketplace
            </h1>
            <p className="text-gray-600">
              Find and rent the perfect farming equipment for your needs
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search equipment, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="tractors">Tractors</option>
                  <option value="harvesters">Harvesters</option>
                  <option value="irrigation">Irrigation</option>
                  <option value="tillage">Tillage</option>
                  <option value="seeding">Seeding</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value, city: 'all' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                >
                  <option value="all">All States</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Punjab">Punjab</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  disabled={filters.state === 'all'}
                >
                  <option value="all">
                    {filters.state === 'all' ? 'Select State First' : 'All Cities'}
                  </option>
                  {filters.state === 'Maharashtra' && (
                    <>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Aurangabad">Aurangabad</option>
                      <option value="Kolhapur">Kolhapur</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹/hr)</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="0-500">₹0 - ₹500</option>
                  <option value="500-1000">₹500 - ₹1000</option>
                  <option value="1000-2000">₹1000 - ₹2000</option>
                  <option value="2000-">₹2000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                >
                  <option value="all">All Equipment</option>
                  <option value="available">Available Only</option>
                  <option value="booked">Currently Booked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredEquipment.length} of {equipment.length} equipment
            </p>
          </div>

          {/* Equipment Grid */}
          {filteredEquipment.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipment.map((item) => (
                <EquipmentCard
                  key={item.id}
                  equipment={item}
                  onBook={handleBookEquipment}
                  onChat={handleChat}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Equipment Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        equipment={selectedEquipment}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBook={handleBook}
      />

      {/* Chat Interface */}
      {chatRecipient && (
        <ChatInterface
          recipientId={chatRecipient.id}
          recipientName={chatRecipient.name}
        />
      )}
    </div>
  );
}
