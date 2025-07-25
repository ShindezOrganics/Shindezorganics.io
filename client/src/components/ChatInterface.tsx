import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
  senderName: string;
}

interface ChatInterfaceProps {
  recipientId?: string;
  recipientName?: string;
}

export default function ChatInterface({ recipientId, recipientName = "Equipment Owner" }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'other',
      message: "Hello! I'm interested in renting your tractor. Is it available tomorrow?",
      timestamp: new Date(),
      senderName: 'John Farmer'
    },
    {
      id: '2',
      senderId: user?.uid || 'current',
      message: "Yes, it's available tomorrow. What time would you need it?",
      timestamp: new Date(),
      senderName: 'You'
    },
    {
      id: '3',
      senderId: 'other',
      message: "Around 8 AM for about 6 hours. What's the rate?",
      timestamp: new Date(),
      senderName: 'John Farmer'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.uid,
      message: newMessage,
      timestamp: new Date(),
      senderName: 'You'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setIsExpanded(true)}
          className="bg-forest-green text-white w-16 h-16 rounded-full shadow-lg hover:bg-sage-green transition-colors flex items-center justify-center"
        >
          <i className="fas fa-comments text-xl"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-white rounded-xl shadow-xl w-80 h-96 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-forest-green text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center">
              <i className="fas fa-user text-sm"></i>
            </div>
            <div>
              <h4 className="font-medium">{recipientName}</h4>
              <p className="text-xs text-green-100">Online</p>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-green-100 hover:text-white"
          >
            <i className="fas fa-minus"></i>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.senderId === user?.uid ? 'justify-end' : ''}`}>
              <div className={`rounded-lg px-4 py-2 max-w-xs ${
                message.senderId === user?.uid
                  ? 'bg-forest-green text-white'
                  : 'bg-gray-100'
              }`}>
                <p className="text-sm">{message.message}</p>
                <span className={`text-xs ${
                  message.senderId === user?.uid ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent text-sm"
            />
            <button 
              type="submit"
              className="bg-forest-green text-white px-4 py-2 rounded-lg hover:bg-sage-green transition-colors"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
