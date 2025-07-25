import { 
  type User, 
  type InsertUser, 
  type Equipment, 
  type InsertEquipment,
  type Booking,
  type InsertBooking,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

// Enhanced storage interface with all required CRUD methods
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Equipment methods
  getAllEquipment(): Promise<Equipment[]>;
  getEquipment(id: string): Promise<Equipment | undefined>;
  getEquipmentByOwner(ownerId: string): Promise<Equipment[]>;
  createEquipment(equipment: InsertEquipment): Promise<Equipment>;
  updateEquipment(id: string, updates: Partial<InsertEquipment>): Promise<Equipment | undefined>;
  deleteEquipment(id: string): Promise<boolean>;
  
  // Booking methods
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  getUserBookings(userId: string): Promise<Booking[]>;
  getEquipmentBookings(equipmentId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  
  // Chat methods
  getChatMessages(userId: string): Promise<ChatMessage[]>;
  getConversation(user1Id: string, user2Id: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  markMessagesAsRead(userId: string, senderId: string): Promise<void>;
  
  // Admin methods
  getAdminStats(): Promise<{
    totalFarmers: number;
    totalEquipment: number;
    activeBookings: number;
    totalRevenue: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private equipment: Map<string, Equipment>;
  private bookings: Map<string, Booking>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.equipment = new Map();
    this.bookings = new Map();
    this.chatMessages = new Map();
    
    // Initialize with some sample data for development
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample users
    const sampleUsers: User[] = [
      {
        id: "user1",
        email: "farmer1@example.com",
        phoneNumber: "+91 9040123456",
        displayName: "Rajesh Kumar",
        photoURL: null,
        isAdmin: false,
        preferredLanguage: "hi",
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "user2", 
        email: "farmer2@example.com",
        phoneNumber: "+91 9040234567",
        displayName: "Priya Sharma",
        photoURL: null,
        isAdmin: false,
        preferredLanguage: "en",
        createdAt: new Date("2024-02-10"),
      },
      {
        id: "admin1",
        email: "admin@shindezorganics.com",
        phoneNumber: "+91 9040000099",
        displayName: "Admin User",
        photoURL: null,
        isAdmin: true,
        preferredLanguage: "en",
        createdAt: new Date("2024-01-01"),
      }
    ];

    sampleUsers.forEach(user => this.users.set(user.id, user));

    // Sample equipment
    const sampleEquipment: Equipment[] = [
      {
        id: "eq1",
        ownerId: "user1",
        name: "Mahindra 575 DI Tractor",
        description: "50 HP tractor suitable for farming operations. Well maintained and fuel efficient.",
        category: "Tractors",
        location: "Pune, Maharashtra",
        hourlyRate: 500,
        dailyRate: 3500,
        images: ["https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        availability: [
          {
            startDate: "2024-01-25",
            endDate: "2024-01-30",
            timeSlots: ["08:00-12:00", "13:00-17:00"]
          }
        ],
        isActive: true,
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "eq2",
        ownerId: "user2",
        name: "John Deere Combine Harvester",
        description: "High-efficiency combine harvester for wheat and rice. Latest model with GPS guidance.",
        category: "Harvesters",
        location: "Nashik, Maharashtra",
        hourlyRate: 2000,
        dailyRate: 12000,
        images: [],
        availability: [],
        isActive: false,
        createdAt: new Date("2024-01-18"),
      },
      {
        id: "eq3",
        ownerId: "user1",
        name: "Drip Irrigation System",
        description: "Complete drip irrigation setup for 5-acre coverage. Water-efficient and automated.",
        category: "Irrigation",
        location: "Aurangabad, Maharashtra",
        hourlyRate: 200,
        dailyRate: 1500,
        images: ["https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"],
        availability: [
          {
            startDate: "2024-01-26",
            endDate: "2024-02-05",
            timeSlots: ["06:00-18:00"]
          }
        ],
        isActive: true,
        createdAt: new Date("2024-01-22"),
      }
    ];

    sampleEquipment.forEach(eq => this.equipment.set(eq.id, eq));

    // Sample bookings
    const sampleBookings: Booking[] = [
      {
        id: "book1",
        equipmentId: "eq2",
        renterId: "user1",
        startDate: new Date("2024-01-26T08:00:00"),
        endDate: new Date("2024-01-26T16:00:00"),
        bookingType: "daily",
        totalCost: 12000,
        status: "confirmed",
        paymentStatus: "completed",
        notes: "Need for wheat harvesting",
        createdAt: new Date("2024-01-24"),
      }
    ];

    sampleBookings.forEach(booking => this.bookings.set(booking.id, booking));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      phoneNumber: insertUser.phoneNumber || null,
      photoURL: insertUser.photoURL || null,
      isAdmin: insertUser.isAdmin || false,
      preferredLanguage: insertUser.preferredLanguage || "en",
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Equipment methods
  async getAllEquipment(): Promise<Equipment[]> {
    return Array.from(this.equipment.values());
  }

  async getEquipment(id: string): Promise<Equipment | undefined> {
    return this.equipment.get(id);
  }

  async getEquipmentByOwner(ownerId: string): Promise<Equipment[]> {
    return Array.from(this.equipment.values()).filter(eq => eq.ownerId === ownerId);
  }

  async createEquipment(insertEquipment: InsertEquipment): Promise<Equipment> {
    const id = randomUUID();
    const equipment: Equipment = {
      ...insertEquipment,
      images: (insertEquipment.images as string[]) || [],
      availability: (insertEquipment.availability as any[]) || [],
      isActive: insertEquipment.isActive ?? true,
      id,
      createdAt: new Date()
    };
    this.equipment.set(id, equipment);
    return equipment;
  }

  async updateEquipment(id: string, updates: Partial<InsertEquipment>): Promise<Equipment | undefined> {
    const equipment = this.equipment.get(id);
    if (!equipment) return undefined;

    const updatedEquipment: Equipment = {
      ...equipment,
      ...updates,
      images: updates.images !== undefined ? (updates.images as string[]) : equipment.images,
      availability: updates.availability !== undefined ? (updates.availability as any[]) : equipment.availability,
      isActive: updates.isActive !== undefined ? updates.isActive : equipment.isActive
    };
    this.equipment.set(id, updatedEquipment);
    return updatedEquipment;
  }

  async deleteEquipment(id: string): Promise<boolean> {
    return this.equipment.delete(id);
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.renterId === userId
    );
  }

  async getEquipmentBookings(equipmentId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.equipmentId === equipmentId
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      status: insertBooking.status || "pending",
      paymentStatus: insertBooking.paymentStatus || "pending",
      notes: insertBooking.notes || null,
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;

    const updatedBooking: Booking = {
      ...booking,
      status
    };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Chat methods
  async getChatMessages(userId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      message => message.senderId === userId || message.receiverId === userId
    ).sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());
  }

  async getConversation(user1Id: string, user2Id: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      message => 
        (message.senderId === user1Id && message.receiverId === user2Id) ||
        (message.senderId === user2Id && message.receiverId === user1Id)
    ).sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      equipmentId: insertMessage.equipmentId || null,
      id,
      timestamp: new Date(),
      isRead: false
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async markMessagesAsRead(userId: string, senderId: string): Promise<void> {
    const messages = Array.from(this.chatMessages.values()).filter(
      message => message.receiverId === userId && message.senderId === senderId
    );
    
    messages.forEach(message => {
      const updatedMessage = { ...message, isRead: true };
      this.chatMessages.set(message.id, updatedMessage);
    });
  }

  // Admin methods
  async getAdminStats(): Promise<{
    totalFarmers: number;
    totalEquipment: number;
    activeBookings: number;
    totalRevenue: number;
  }> {
    const totalFarmers = Array.from(this.users.values()).filter(user => !user.isAdmin).length;
    const totalEquipment = this.equipment.size;
    const activeBookings = Array.from(this.bookings.values()).filter(
      booking => booking.status === 'confirmed' || booking.status === 'pending'
    ).length;
    const totalRevenue = Array.from(this.bookings.values())
      .filter(booking => booking.paymentStatus === 'completed')
      .reduce((sum, booking) => sum + booking.totalCost, 0);

    return {
      totalFarmers,
      totalEquipment,
      activeBookings,
      totalRevenue
    };
  }
}

export const storage = new MemStorage();
