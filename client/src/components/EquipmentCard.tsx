import { Equipment } from '@shared/schema';

interface EquipmentCardProps {
  equipment: Equipment;
  onBook: (equipment: Equipment) => void;
  onChat: (ownerId: string) => void;
  onViewDetails: (equipment: Equipment) => void;
}

export default function EquipmentCard({ equipment, onBook, onChat, onViewDetails }: EquipmentCardProps) {
  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Available' : 'Booked';
  };

  // Default image if no images are provided
  const defaultImage = "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  const imageUrl = equipment.images && equipment.images.length > 0 ? equipment.images[0] : defaultImage;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={imageUrl}
        alt={equipment.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-xl font-semibold text-gray-900">
            {equipment.name}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(equipment.isActive ?? true)}`}>
            {getStatusText(equipment.isActive ?? true)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {equipment.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <i className="fas fa-map-marker-alt text-forest-green"></i>
            <div className="text-gray-600 text-sm">
              <div className="font-medium">{equipment.city}, {equipment.state}</div>
              {equipment.location && (
                <div className="text-xs text-gray-500 mt-1">{equipment.location}</div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-forest-green">
              ₹{equipment.hourlyRate}/hr
            </div>
            <div className="text-sm text-gray-500">
              ₹{equipment.dailyRate}/day
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onBook(equipment)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              (equipment.isActive ?? true)
                ? 'bg-forest-green text-white hover:bg-sage-green'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!(equipment.isActive ?? true)}
          >
            <i className="fas fa-calendar-check mr-2"></i>
            {(equipment.isActive ?? true) ? 'Book Now' : 'Currently Booked'}
          </button>
          <button 
            onClick={() => onViewDetails(equipment)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            title="View Details"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            onClick={() => onChat(equipment.ownerId)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            title="Chat with Owner"
          >
            <i className="fas fa-comment"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
