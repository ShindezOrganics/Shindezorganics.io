import { useState } from 'react';
import { Equipment, InsertBooking } from '@shared/schema';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (booking: Partial<InsertBooking>) => void;
}

export default function BookingModal({ equipment, isOpen, onClose, onBook }: BookingModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookingType, setBookingType] = useState<'hourly' | 'daily'>('hourly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen || !equipment) return null;

  const calculateTotalCost = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate + 'T' + (startTime || '00:00'));
    const end = new Date(endDate + 'T' + (endTime || '23:59'));
    
    if (bookingType === 'daily') {
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days * equipment.dailyRate;
    } else {
      const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
      return hours * equipment.hourlyRate;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book equipment",
        variant: "destructive"
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Invalid Dates",
        description: "Please select valid start and end dates",
        variant: "destructive"
      });
      return;
    }

    const booking: Partial<InsertBooking> = {
      equipmentId: equipment.id,
      renterId: user.uid,
      startDate: new Date(startDate + 'T' + (startTime || '00:00')),
      endDate: new Date(endDate + 'T' + (endTime || '23:59')),
      bookingType,
      totalCost: calculateTotalCost(),
      notes: notes || undefined,
    };

    onBook(booking);
  };

  const totalCost = calculateTotalCost();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-2xl font-bold text-gray-900">Book Equipment</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">{equipment.name}</h4>
            <p className="text-gray-600">{equipment.description}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="bookingType" 
                    value="hourly"
                    checked={bookingType === 'hourly'}
                    onChange={(e) => setBookingType(e.target.value as 'hourly')}
                    className="text-forest-green focus:ring-forest-green" 
                  />
                  <span className="ml-2">Hourly (₹{equipment.hourlyRate}/hr)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="bookingType" 
                    value="daily"
                    checked={bookingType === 'daily'}
                    onChange={(e) => setBookingType(e.target.value as 'daily')}
                    className="text-forest-green focus:ring-forest-green"
                  />
                  <span className="ml-2">Daily (₹{equipment.dailyRate}/day)</span>
                </label>
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Time Selection */}
            {bookingType === 'hourly' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input 
                    type="time" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input 
                    type="time" 
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
              <textarea 
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent" 
                placeholder="Any specific requirements or notes..."
              />
            </div>

            {/* Total Cost */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Cost:</span>
                <span className="text-2xl font-bold text-forest-green">₹{totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Firebase Keys Request */}
            {!import.meta.env.VITE_FIREBASE_API_KEY && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-key text-yellow-600 mr-3 mt-1"></i>
                  <div>
                    <h5 className="font-medium text-yellow-800">Firebase Configuration Required</h5>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please provide your Firebase configuration keys to enable booking functionality, authentication, and real-time features.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
              >
                <i className="fas fa-times"></i>
                <span>Cancel</span>
              </button>
              <button 
                type="submit"
                className="flex-1 bg-forest-green text-white px-4 py-3 rounded-lg font-medium hover:bg-sage-green transition-colors flex items-center justify-center space-x-2"
              >
                <i className="fas fa-credit-card"></i>
                <span>Book & Pay with Razorpay</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
