// Management Subdomain Mock Database
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'admin' | 'organizer' | 'vendor' | 'speaker' | 'sponsor';
  status: 'pending' | 'verified' | 'rejected';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Organizer extends User {
  role: 'organizer';
  companyName: string;
  website?: string;
  description: string;
  experience: string;
  specialization: string[];
  location: string;
  eventsOrganized: number;
  rating: number;
  portfolio: string[];
}

export interface Vendor extends User {
  role: 'vendor';
  companyName: string;
  serviceType: string;
  description: string;
  location: string;
  priceRange: string;
  rating: number;
  portfolio: string[];
  services: string[];
  availability: string[];
}

export interface Speaker extends User {
  role: 'speaker';
  title: string;
  bio: string;
  expertise: string[];
  experience: string;
  location: string;
  speakingFee: string;
  rating: number;
  topics: string[];
  languages: string[];
  pastEvents: number;
}

export interface Sponsor extends User {
  role: 'sponsor';
  companyName: string;
  industry: string;
  description: string;
  website?: string;
  sponsorshipBudget: string;
  preferredEvents: string[];
  location: string;
  rating: number;
  pastSponsorships: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  organizerId: string;
  status: 'draft' | 'pending' | 'approved' | 'published' | 'completed';
  budget: string;
  expectedAttendees: number;
  requirements: {
    vendors: string[];
    speakers: string[];
    sponsors: string[];
  };
  connectedVendors: string[];
  connectedSpeakers: string[];
  connectedSponsors: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  eventId: string;
  organizerId: string;
  partnerId: string; // vendor, speaker, or sponsor ID
  partnerType: 'vendor' | 'speaker' | 'sponsor';
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'event_invitation' | 'connection_request' | 'status_update' | 'verification';
  read: boolean;
  data?: any;
  createdAt: string;
}

// Demo Users
export const demoUsers: (Organizer | Vendor | Speaker | Sponsor | User)[] = [
  // Admin
  {
    id: 'admin-1',
    email: 'admin@management.ticketshub.com',
    password: 'admin123',
    name: 'Admin User',
    phone: '+91 98765 43210',
    role: 'admin',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-12-15T10:00:00Z'
  },
  
  // Organizers
  {
    id: 'org-1',
    email: 'organizer@management.ticketshub.com',
    password: 'organizer123',
    name: 'John Smith',
    phone: '+91 98765 43211',
    role: 'organizer',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    companyName: 'EventPro Productions',
    website: 'www.eventpro.com',
    description: 'Leading event management company specializing in corporate and entertainment events.',
    experience: '8+ years',
    specialization: ['Corporate Events', 'Concerts', 'Conferences', 'Weddings'],
    location: 'Mumbai, Maharashtra',
    eventsOrganized: 150,
    rating: 4.8,
    portfolio: [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    createdAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-12-15T09:30:00Z'
  },
  
  // Vendors
  {
    id: 'vendor-1',
    email: 'vendor@management.ticketshub.com',
    password: 'vendor123',
    name: 'Sarah Johnson',
    phone: '+91 98765 43212',
    role: 'vendor',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    companyName: 'Elite Catering Services',
    serviceType: 'Catering',
    description: 'Premium catering services for all types of events with customizable menus.',
    location: 'Delhi, India',
    priceRange: '₹500 - ₹2000 per person',
    rating: 4.7,
    portfolio: [
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    services: ['Catering', 'Bar Service', 'Waitstaff', 'Event Setup'],
    availability: ['Weekends', 'Weekdays', 'Holidays'],
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-12-15T08:45:00Z'
  },
  
  // Speakers
  {
    id: 'speaker-1',
    email: 'speaker@management.ticketshub.com',
    password: 'speaker123',
    name: 'Dr. Rajesh Kumar',
    phone: '+91 98765 43213',
    role: 'speaker',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    title: 'Technology Innovation Expert',
    bio: 'Renowned technology speaker with 15+ years of experience in AI and digital transformation.',
    expertise: ['Artificial Intelligence', 'Digital Transformation', 'Innovation', 'Leadership'],
    experience: '15+ years',
    location: 'Bangalore, Karnataka',
    speakingFee: '₹50,000 - ₹1,00,000',
    rating: 4.9,
    topics: ['AI in Business', 'Future of Technology', 'Digital Leadership', 'Innovation Strategies'],
    languages: ['English', 'Hindi', 'Kannada'],
    pastEvents: 200,
    createdAt: '2024-02-15T00:00:00Z',
    lastLogin: '2024-12-15T07:20:00Z'
  },
  
  // Sponsors
  {
    id: 'sponsor-1',
    email: 'sponsor@management.ticketshub.com',
    password: 'sponsor123',
    name: 'Michael Chen',
    phone: '+91 98765 43214',
    role: 'sponsor',
    status: 'verified',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    description: 'Leading technology company looking to sponsor innovative events and conferences.',
    website: 'www.techcorp.com',
    sponsorshipBudget: '₹5,00,000 - ₹20,00,000',
    preferredEvents: ['Technology Conferences', 'Startup Events', 'Innovation Summits'],
    location: 'Pune, Maharashtra',
    rating: 4.6,
    pastSponsorships: 45,
    createdAt: '2024-03-01T00:00:00Z',
    lastLogin: '2024-12-15T11:15:00Z'
  }
];

// Demo Events
export const demoEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Tech Innovation Summit 2025',
    description: 'A premier technology conference bringing together industry leaders and innovators.',
    category: 'Technology Conference',
    date: '2025-03-15',
    time: '09:00 AM',
    venue: 'Convention Center',
    location: 'Mumbai, Maharashtra',
    organizerId: 'org-1',
    status: 'published',
    budget: '₹25,00,000',
    expectedAttendees: 1000,
    requirements: {
      vendors: ['Catering', 'AV Equipment', 'Photography'],
      speakers: ['Technology', 'Innovation', 'AI'],
      sponsors: ['Technology', 'Startup']
    },
    connectedVendors: ['vendor-1'],
    connectedSpeakers: ['speaker-1'],
    connectedSponsors: ['sponsor-1'],
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z'
  }
];

// Demo Connections
export const demoConnections: Connection[] = [
  {
    id: 'conn-1',
    eventId: 'event-1',
    organizerId: 'org-1',
    partnerId: 'vendor-1',
    partnerType: 'vendor',
    status: 'accepted',
    message: 'We would love to provide catering services for your tech summit.',
    createdAt: '2024-12-10T00:00:00Z',
    updatedAt: '2024-12-12T00:00:00Z'
  },
  {
    id: 'conn-2',
    eventId: 'event-1',
    organizerId: 'org-1',
    partnerId: 'speaker-1',
    partnerType: 'speaker',
    status: 'accepted',
    message: 'Excited to speak about AI innovations at your summit.',
    createdAt: '2024-12-11T00:00:00Z',
    updatedAt: '2024-12-13T00:00:00Z'
  }
];

// Demo Notifications
export const demoNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'vendor-1',
    title: 'New Event Opportunity',
    message: 'Tech Innovation Summit 2025 is looking for catering services.',
    type: 'event_invitation',
    read: false,
    data: { eventId: 'event-1' },
    createdAt: '2024-12-15T10:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'speaker-1',
    title: 'Speaking Invitation',
    message: 'You have been invited to speak at Tech Innovation Summit 2025.',
    type: 'event_invitation',
    read: true,
    data: { eventId: 'event-1' },
    createdAt: '2024-12-14T15:30:00Z'
  }
];

// Database Query Functions
export const getUserByEmail = (email: string): any => {
  return demoUsers.find(user => user.email === email);
};

export const getUserById = (id: string): any => {
  return demoUsers.find(user => user.id === id);
};

export const getUsersByRole = (role: string): any[] => {
  return demoUsers.filter(user => user.role === role);
};

export const getEventsByOrganizer = (organizerId: string): Event[] => {
  return demoEvents.filter(event => event.organizerId === organizerId);
};

export const getConnectionsByUser = (userId: string): Connection[] => {
  return demoConnections.filter(conn => 
    conn.organizerId === userId || conn.partnerId === userId
  );
};

export const getNotificationsByUser = (userId: string): Notification[] => {
  return demoNotifications.filter(notif => notif.userId === userId);
};

export const getAllEvents = (): Event[] => {
  return demoEvents;
};

export const getEventById = (id: string): Event | undefined => {
  return demoEvents.find(event => event.id === id);
};

// Demo credentials for easy access
export const DEMO_CREDENTIALS = {
  admin: {
    email: 'admin@management.ticketshub.com',
    password: 'admin123'
  },
  organizer: {
    email: 'organizer@management.ticketshub.com',
    password: 'organizer123'
  },
  vendor: {
    email: 'vendor@management.ticketshub.com',
    password: 'vendor123'
  },
  speaker: {
    email: 'speaker@management.ticketshub.com',
    password: 'speaker123'
  },
  sponsor: {
    email: 'sponsor@management.ticketshub.com',
    password: 'sponsor123'
  }
};