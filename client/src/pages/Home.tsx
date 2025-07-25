import { useState, useEffect } from 'react';
import { Equipment } from '@shared/schema';
import EquipmentCard from '@/components/EquipmentCard';
import BookingModal from '@/components/BookingModal';
import ChatInterface from '@/components/ChatInterface';
import LanguageSelector from '@/components/LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<{ id: string; name: string } | null>(null);

  // Mock equipment data - in production this would come from Firebase
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
        images: ['https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'],
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
      }
    ];
    setEquipment(mockEquipment);
  }, []);

  const handleBookEquipment = (equipment: Equipment) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book equipment",
        variant: "destructive"
      });
      return;
    }
    setSelectedEquipment(equipment);
    setIsBookingModalOpen(true);
  };

  const handleBook = (booking: any) => {
    // In production, this would send the booking to Firebase
    console.log('Booking submitted:', booking);
    toast({
      title: "Booking Submitted",
      description: "Your booking request has been sent to the equipment owner",
    });
    setIsBookingModalOpen(false);
  };

  const handleChat = (ownerId: string) => {
    setChatRecipient({ id: ownerId, name: "Equipment Owner" });
  };

  const handleViewDetails = (equipment: Equipment) => {
    console.log('View details for:', equipment.name);
  };

  return (
    <div className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-forest-green to-sage-green text-white py-16 px-4">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Farm landscape with green fields" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="font-heading text-4xl lg:text-6xl font-bold mb-6">
            Empowering Indian Farmers
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
            Rent or sell agricultural equipment on hourly or daily basis. Connect with fellow farmers and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-farm-gold text-forest-green px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2">
              <i className="fas fa-search"></i>
              <span>Start Renting Equipment</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-forest-green transition-colors flex items-center justify-center space-x-2">
              <i className="fas fa-plus"></i>
              <span>List Your Equipment</span>
            </button>
          </div>
        </div>
      </section>

      <LanguageSelector />

      {/* Equipment Marketplace */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Agricultural equipment background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">Available Equipment</h2>
              <p className="text-gray-600">Find the perfect agricultural equipment for your farming needs</p>
            </div>
            <div className="mt-4 lg:mt-0 flex space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent">
                <option>All Categories</option>
                <option>Tractors</option>
                <option>Harvesters</option>
                <option>Plows</option>
                <option>Seeders</option>
                <option>Irrigation</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent">
                <option>All Locations</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
              </select>
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <EquipmentCard
                key={item.id}
                equipment={item}
                onBook={handleBookEquipment}
                onChat={handleChat}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-forest-green text-white px-8 py-3 rounded-lg font-medium hover:bg-sage-green transition-colors flex items-center justify-center space-x-2 mx-auto">
              <i className="fas fa-sync-alt"></i>
              <span>Load More Equipment</span>
            </button>
          </div>
        </div>
      </section>

      {/* Farming Education Section */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Organic farming background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">Farming Education</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Learn modern and organic farming techniques from expert farmers and agricultural scientists</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Organic Farming Basics",
                description: "Learn the fundamentals of organic farming and sustainable agriculture practices.",
                duration: "15 mins",
                category: "Organic",
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              },
              {
                title: "Tractor Operation & Maintenance",
                description: "Complete guide to operating and maintaining agricultural tractors safely and efficiently.",
                duration: "25 mins",
                category: "Equipment",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              },
              {
                title: "Water Management Techniques",
                description: "Efficient irrigation methods and water conservation strategies for modern farming.",
                duration: "20 mins",
                category: "Irrigation",
                image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              }
            ].map((video, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={video.image} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center hover:bg-opacity-100 transition-all">
                      <i className="fas fa-play text-forest-green text-xl"></i>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Duration: {video.duration}</span>
                    <span>Category: {video.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-forest-green text-white px-8 py-3 rounded-lg font-medium hover:bg-sage-green transition-colors flex items-center justify-center space-x-2 mx-auto">
              <i className="fas fa-play-circle"></i>
              <span>View All Videos</span>
            </button>
          </div>
        </div>
      </section>

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
