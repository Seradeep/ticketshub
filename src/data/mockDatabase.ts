// Centralized Mock Database for TICKETSHUB
export interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  state: string;
  price: string;
  rating: number;
  image: string;
  featured?: boolean;
  description?: string;
  tags?: string[];
}

export interface State {
  name: string;
  city: string;
  events: number;
  image: string;
  gradient: string;
}

// Function to get temporary events from session storage
const getTempEvents = (): Event[] => {
  try {
    const tempEvents = sessionStorage.getItem('temp_events');
    return tempEvents ? JSON.parse(tempEvents) : [];
  } catch {
    return [];
  }
};

// All Events Database
export const allEvents: Event[] = [
  // Mumbai Events
  {
    id: 1,
    title: "Coldplay Live in Concert",
    category: "Concerts",
    date: "Dec 15, 2024",
    time: "7:00 PM",
    venue: "DY Patil Stadium",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹2,500",
    rating: 4.9,
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    description: "Experience the magic of Coldplay's Music of the Spheres World Tour",
    tags: ["trending", "popular", "live"]
  },
  {
    id: 2,
    title: "Avengers: Secret Wars",
    category: "Movies",
    date: "Dec 20, 2024",
    time: "Multiple Shows",
    venue: "PVR Cinemas",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹350",
    rating: 4.8,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    description: "The ultimate Marvel superhero experience",
    tags: ["trending", "popular"]
  },
  {
    id: 3,
    title: "Mumbai Indians vs CSK",
    category: "Sports",
    date: "Feb 10, 2025",
    time: "7:30 PM",
    venue: "Wankhede Stadium",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹800",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Epic IPL clash between two powerhouse teams",
    tags: ["trending", "popular"]
  },
  {
    id: 4,
    title: "The Lion King Musical",
    category: "Theater",
    date: "Dec 25, 2024",
    time: "6:00 PM",
    venue: "NCPA",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹2,000",
    rating: 4.8,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    description: "Broadway's award-winning musical comes to Mumbai",
    tags: ["trending", "popular"]
  },
  {
    id: 5,
    title: "Tech Summit 2025",
    category: "Events",
    date: "Jan 20, 2025",
    time: "9:00 AM",
    venue: "Bombay Exhibition Centre",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹1,200",
    rating: 4.6,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "India's largest technology conference",
    tags: ["trending", "recommended"]
  },
  {
    id: 6,
    title: "Kapil Sharma Live",
    category: "Comedy",
    date: "Dec 30, 2024",
    time: "8:00 PM",
    venue: "Jio Garden",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹999",
    rating: 4.5,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Laugh out loud with India's comedy king",
    tags: ["trending", "live"]
  },
  {
    id: 7,
    title: "Cycling Marathon",
    category: "Sports",
    date: "Dec 31, 2024",
    time: "6:00 AM",
    venue: "Marine Drive",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹500",
    rating: 4.5,
    image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "New Year cycling challenge along Mumbai's coastline",
    tags: ["outdoor"]
  },
  {
    id: 8,
    title: "Beach Volleyball Tournament",
    category: "Sports",
    date: "Jan 22, 2025",
    time: "9:00 AM",
    venue: "Juhu Beach",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹750",
    rating: 4.4,
    image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Professional beach volleyball championship",
    tags: ["outdoor"]
  },
  {
    id: 9,
    title: "Jazz Night Live",
    category: "Concerts",
    date: "Jan 18, 2025",
    time: "8:30 PM",
    venue: "Blue Frog",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹1,200",
    rating: 4.8,
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Intimate jazz performance with renowned artists",
    tags: ["live", "recommended"]
  },
  {
    id: 10,
    title: "Bollywood Night",
    category: "Events",
    date: "Dec 29, 2024",
    time: "8:00 PM",
    venue: "Grand Ballroom",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹1,500",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Dance the night away to Bollywood hits",
    tags: ["popular"]
  },

  // Additional Movies
  {
    id: 11,
    title: "Spider-Man: Beyond",
    category: "Movies",
    date: "Dec 22, 2024",
    time: "Multiple Shows",
    venue: "INOX Megaplex",
    location: "Delhi",
    state: "Delhi",
    price: "₹400",
    rating: 4.7,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "The web-slinger's latest adventure",
    tags: ["trending"]
  },
  {
    id: 12,
    title: "Outdoor Movie Screening",
    category: "Movies",
    date: "Jan 12, 2025",
    time: "7:30 PM",
    venue: "Central Park",
    location: "Delhi",
    state: "Delhi",
    price: "₹300",
    rating: 4.3,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Movies under the stars",
    tags: ["outdoor"]
  },
  {
    id: 13,
    title: "Bollywood Blockbuster",
    category: "Movies",
    date: "Jan 15, 2025",
    time: "Multiple Shows",
    venue: "PVR Cinemas",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹380",
    rating: 4.5,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Latest Bollywood action thriller",
    tags: ["popular"]
  },
  {
    id: 14,
    title: "Hollywood Action Movie",
    category: "Movies",
    date: "Jan 25, 2025",
    time: "Multiple Shows",
    venue: "Cineplex",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹420",
    rating: 4.6,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "High-octane action blockbuster",
    tags: ["trending", "popular"]
  },
  {
    id: 15,
    title: "Animated Family Film",
    category: "Movies",
    date: "Feb 5, 2025",
    time: "Multiple Shows",
    venue: "Fun Cinemas",
    location: "Pune",
    state: "Maharashtra",
    price: "₹280",
    rating: 4.4,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Perfect family entertainment",
    tags: ["recommended"]
  },
  {
    id: 16,
    title: "Indie Film Festival",
    category: "Movies",
    date: "Feb 12, 2025",
    time: "6:00 PM",
    venue: "Art Cinema",
    location: "Goa",
    state: "Goa",
    price: "₹350",
    rating: 4.5,
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Showcase of independent cinema",
    tags: ["recommended"]
  },

  // Additional Concerts
  {
    id: 17,
    title: "Diljit Dosanjh Concert",
    category: "Concerts",
    date: "Jan 5, 2025",
    time: "8:00 PM",
    venue: "Mahalaxmi Race Course",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹3,500",
    rating: 4.9,
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    description: "Punjabi superstar live in concert",
    tags: ["trending", "popular"]
  },
  {
    id: 18,
    title: "AR Rahman Live Concert",
    category: "Concerts",
    date: "Jan 15, 2025",
    time: "7:00 PM",
    venue: "NSCI Dome",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹1,500",
    rating: 4.9,
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "The Mozart of Madras performs his greatest hits",
    tags: ["recommended", "live"]
  },
  {
    id: 19,
    title: "Beach Music Festival",
    category: "Concerts",
    date: "Feb 14, 2025",
    time: "4:00 PM",
    venue: "Anjuna Beach",
    location: "Goa",
    state: "Goa",
    price: "₹1,800",
    rating: 4.8,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Music festival by the beach",
    tags: ["outdoor", "popular"]
  },
  {
    id: 20,
    title: "Rock Concert Night",
    category: "Concerts",
    date: "Feb 20, 2025",
    time: "8:00 PM",
    venue: "Rock Arena",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹2,200",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Heavy metal and rock music night",
    tags: ["live", "popular"]
  },
  {
    id: 21,
    title: "Classical Music Evening",
    category: "Concerts",
    date: "Jan 30, 2025",
    time: "7:30 PM",
    venue: "Music Hall",
    location: "Delhi",
    state: "Delhi",
    price: "₹1,800",
    rating: 4.6,
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Traditional Indian classical music",
    tags: ["recommended"]
  },
  {
    id: 22,
    title: "Electronic Dance Music Festival",
    category: "Concerts",
    date: "Mar 5, 2025",
    time: "6:00 PM",
    venue: "Open Grounds",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹2,800",
    rating: 4.8,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Electronic music and DJ performances",
    tags: ["trending", "popular"]
  },

  // Additional Sports
  {
    id: 23,
    title: "RCB vs MI",
    category: "Sports",
    date: "Mar 15, 2025",
    time: "7:30 PM",
    venue: "M. Chinnaswamy Stadium",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹1,200",
    rating: 4.8,
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Royal Challengers Bangalore vs Mumbai Indians",
    tags: ["trending", "popular"]
  },
  {
    id: 24,
    title: "Football Championship",
    category: "Sports",
    date: "Feb 20, 2025",
    time: "4:00 PM",
    venue: "Sports Complex",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹600",
    rating: 4.5,
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Regional football championship finals",
    tags: ["popular"]
  },
  {
    id: 25,
    title: "Basketball Tournament",
    category: "Sports",
    date: "Jan 28, 2025",
    time: "5:00 PM",
    venue: "Indoor Stadium",
    location: "Delhi",
    state: "Delhi",
    price: "₹500",
    rating: 4.4,
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Professional basketball league match",
    tags: ["recommended"]
  },
  {
    id: 26,
    title: "Tennis Championship",
    category: "Sports",
    date: "Feb 8, 2025",
    time: "2:00 PM",
    venue: "Tennis Club",
    location: "Pune",
    state: "Maharashtra",
    price: "₹800",
    rating: 4.6,
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "National tennis championship",
    tags: ["trending"]
  },
  {
    id: 27,
    title: "Marathon Run",
    category: "Sports",
    date: "Jan 15, 2025",
    time: "6:00 AM",
    venue: "City Streets",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹300",
    rating: 4.3,
    image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Annual city marathon event",
    tags: ["outdoor"]
  },

  // Additional Theater
  {
    id: 28,
    title: "Hamilton Musical",
    category: "Theater",
    date: "Jan 12, 2025",
    time: "7:00 PM",
    venue: "Tata Theatre",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹2,800",
    rating: 4.9,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "The revolutionary Broadway musical",
    tags: ["trending", "popular"]
  },
  {
    id: 29,
    title: "Cultural Dance Festival",
    category: "Theater",
    date: "Feb 12, 2025",
    time: "6:30 PM",
    venue: "Cultural Center",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹650",
    rating: 4.5,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Celebration of traditional Indian dance forms",
    tags: ["popular"]
  },
  {
    id: 30,
    title: "Shakespeare Play",
    category: "Theater",
    date: "Jan 20, 2025",
    time: "8:00 PM",
    venue: "Drama Theatre",
    location: "Delhi",
    state: "Delhi",
    price: "₹1,200",
    rating: 4.7,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Classic Shakespearean drama performance",
    tags: ["recommended"]
  },
  {
    id: 31,
    title: "Modern Dance Performance",
    category: "Theater",
    date: "Feb 5, 2025",
    time: "7:30 PM",
    venue: "Arts Center",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹900",
    rating: 4.4,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Contemporary dance showcase",
    tags: ["recommended"]
  },
  {
    id: 32,
    title: "Opera Night",
    category: "Theater",
    date: "Mar 1, 2025",
    time: "7:00 PM",
    venue: "Opera House",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹3,200",
    rating: 4.8,
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Grand opera performance",
    tags: ["popular"]
  },

  // Additional Events
  {
    id: 33,
    title: "Digital Marketing Bootcamp",
    category: "Events",
    date: "Feb 5, 2025",
    time: "9:00 AM",
    venue: "Tech Hub",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹3,500",
    rating: 4.6,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Master digital marketing strategies",
    tags: ["recommended"]
  },
  {
    id: 34,
    title: "Photography Workshop",
    category: "Events",
    date: "Dec 22, 2024",
    time: "10:00 AM",
    venue: "Art Gallery",
    location: "Delhi",
    state: "Delhi",
    price: "₹1,999",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Master the art of photography",
    tags: ["recommended"]
  },
  {
    id: 35,
    title: "Startup Pitch Competition",
    category: "Events",
    date: "Jan 18, 2025",
    time: "11:00 AM",
    venue: "Innovation Center",
    location: "Pune",
    state: "Maharashtra",
    price: "₹500",
    rating: 4.5,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Entrepreneurs showcase their ideas",
    tags: ["trending"]
  },
  {
    id: 36,
    title: "Art Exhibition",
    category: "Events",
    date: "Feb 15, 2025",
    time: "11:00 AM",
    venue: "Modern Art Gallery",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹200",
    rating: 4.4,
    image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Contemporary art showcase",
    tags: ["popular"]
  },
  {
    id: 37,
    title: "Book Fair",
    category: "Events",
    date: "Jan 25, 2025",
    time: "10:00 AM",
    venue: "Exhibition Ground",
    location: "Delhi",
    state: "Delhi",
    price: "₹100",
    rating: 4.3,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Annual book fair and literary festival",
    tags: ["recommended"]
  },

  // Gaming Events
  {
    id: 38,
    title: "Gaming Championship",
    category: "Gaming",
    date: "Jan 28, 2025",
    time: "10:00 AM",
    venue: "Gaming Arena",
    location: "Pune",
    state: "Maharashtra",
    price: "₹899",
    rating: 4.6,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Esports tournament with cash prizes",
    tags: ["popular"]
  },
  {
    id: 39,
    title: "PUBG Mobile Tournament",
    category: "Gaming",
    date: "Feb 5, 2025",
    time: "11:00 AM",
    venue: "Cyber Hub",
    location: "Delhi",
    state: "Delhi",
    price: "₹1,200",
    rating: 4.7,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "National PUBG Mobile championship",
    tags: ["trending"]
  },
  {
    id: 40,
    title: "Valorant Pro League",
    category: "Gaming",
    date: "Feb 12, 2025",
    time: "2:00 PM",
    venue: "Gaming Center",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹1,500",
    rating: 4.8,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Professional Valorant tournament",
    tags: ["popular"]
  },
  {
    id: 41,
    title: "FIFA Tournament",
    category: "Gaming",
    date: "Jan 22, 2025",
    time: "1:00 PM",
    venue: "Gaming Lounge",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹800",
    rating: 4.5,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "FIFA gaming championship",
    tags: ["recommended"]
  },
  {
    id: 42,
    title: "Call of Duty Championship",
    category: "Gaming",
    date: "Mar 8, 2025",
    time: "12:00 PM",
    venue: "Esports Arena",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹1,100",
    rating: 4.6,
    image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Call of Duty professional tournament",
    tags: ["trending"]
  },

  // Comedy Events
  {
    id: 43,
    title: "Stand-up Comedy Night",
    category: "Comedy",
    date: "Dec 28, 2024",
    time: "8:30 PM",
    venue: "Comedy Store",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹599",
    rating: 4.6,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Best of Bangalore's comedy scene",
    tags: ["recommended", "live"]
  },
  {
    id: 44,
    title: "Comedy Central Live",
    category: "Comedy",
    date: "Feb 8, 2025",
    time: "9:00 PM",
    venue: "Laugh Club",
    location: "Delhi",
    state: "Delhi",
    price: "₹799",
    rating: 4.7,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Top comedians perform live",
    tags: ["popular"]
  },
  {
    id: 45,
    title: "Improv Comedy Show",
    category: "Comedy",
    date: "Jan 15, 2025",
    time: "8:00 PM",
    venue: "Comedy Theatre",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹650",
    rating: 4.4,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Interactive improvisational comedy",
    tags: ["live"]
  },
  {
    id: 46,
    title: "Comedy Roast Night",
    category: "Comedy",
    date: "Feb 22, 2025",
    time: "9:30 PM",
    venue: "Roast Club",
    location: "Pune",
    state: "Maharashtra",
    price: "₹750",
    rating: 4.5,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Comedy roast with celebrity guests",
    tags: ["trending"]
  },
  {
    id: 47,
    title: "Open Mic Comedy",
    category: "Comedy",
    date: "Jan 30, 2025",
    time: "7:30 PM",
    venue: "Cafe Comedy",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹300",
    rating: 4.2,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Open mic night for aspiring comedians",
    tags: ["live"]
  },

  // Lifestyle Events
  {
    id: 48,
    title: "Meditation Masterclass",
    category: "Lifestyle",
    date: "Jan 8, 2025",
    time: "7:00 AM",
    venue: "Zen Center",
    location: "Pune",
    state: "Maharashtra",
    price: "₹899",
    rating: 4.7,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Learn advanced meditation techniques",
    tags: ["recommended"]
  },
  {
    id: 49,
    title: "Yoga Retreat Weekend",
    category: "Lifestyle",
    date: "Jan 25, 2025",
    time: "6:00 AM",
    venue: "Wellness Center",
    location: "Goa",
    state: "Goa",
    price: "₹2,500",
    rating: 4.8,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Rejuvenating yoga retreat by the sea",
    tags: ["recommended", "outdoor"]
  },
  {
    id: 50,
    title: "Food & Wine Festival",
    category: "Lifestyle",
    date: "Jan 10, 2025",
    time: "12:00 PM",
    venue: "Phoenix Mills",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹799",
    rating: 4.4,
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Culinary celebration with top chefs",
    tags: ["recommended"]
  },
  {
    id: 51,
    title: "Wellness Workshop",
    category: "Lifestyle",
    date: "Feb 18, 2025",
    time: "10:00 AM",
    venue: "Health Center",
    location: "Chennai",
    state: "Tamil Nadu",
    price: "₹1,200",
    rating: 4.6,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Holistic wellness and mindfulness workshop",
    tags: ["recommended"]
  },
  {
    id: 52,
    title: "Cooking Class",
    category: "Lifestyle",
    date: "Jan 20, 2025",
    time: "11:00 AM",
    venue: "Culinary School",
    location: "Delhi",
    state: "Delhi",
    price: "₹1,500",
    rating: 4.5,
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Learn to cook gourmet dishes",
    tags: ["recommended"]
  },
  {
    id: 53,
    title: "Wine Tasting Evening",
    category: "Lifestyle",
    date: "Feb 10, 2025",
    time: "7:00 PM",
    venue: "Wine Bar",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹2,200",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Premium wine tasting experience",
    tags: ["popular"]
  },
  {
    id: 54,
    title: "Fitness Bootcamp",
    category: "Lifestyle",
    date: "Jan 12, 2025",
    time: "6:30 AM",
    venue: "Fitness Center",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹800",
    rating: 4.3,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "High-intensity fitness training",
    tags: ["outdoor"]
  },

  // Additional Outdoor Events
  {
    id: 55,
    title: "Sunrise Hot Air Balloon",
    category: "Adventure",
    date: "Feb 8, 2025",
    time: "5:30 AM",
    venue: "Open Fields",
    location: "Jaipur",
    state: "Rajasthan",
    price: "₹8,500",
    rating: 4.9,
    image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Breathtaking sunrise balloon ride over the Pink City",
    tags: ["outdoor", "recommended"]
  },
  {
    id: 56,
    title: "Rock Climbing Workshop",
    category: "Adventure",
    date: "Jan 18, 2025",
    time: "8:00 AM",
    venue: "Adventure Park",
    location: "Lonavala",
    state: "Maharashtra",
    price: "₹2,200",
    rating: 4.7,
    image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Learn rock climbing from certified instructors",
    tags: ["outdoor"]
  },
  {
    id: 57,
    title: "Trekking Adventure",
    category: "Adventure",
    date: "Jan 5, 2025",
    time: "5:00 AM",
    venue: "Sahyadri Mountains",
    location: "Maharashtra",
    state: "Maharashtra",
    price: "₹1,200",
    rating: 4.6,
    image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Guided trek through scenic mountain trails",
    tags: ["outdoor"]
  },
  {
    id: 58,
    title: "Camping Under Stars",
    category: "Adventure",
    date: "Feb 15, 2025",
    time: "6:00 PM",
    venue: "Desert Camp",
    location: "Rajasthan",
    state: "Rajasthan",
    price: "₹3,500",
    rating: 4.8,
    image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Desert camping with cultural performances",
    tags: ["outdoor", "popular"]
  },

  // Additional Live Events
  {
    id: 59,
    title: "Live Poetry Session",
    category: "Literature",
    date: "Dec 26, 2024",
    time: "7:00 PM",
    venue: "Cafe Mocha",
    location: "Delhi",
    state: "Delhi",
    price: "₹399",
    rating: 4.5,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Evening of spoken word and poetry",
    tags: ["live"]
  },
  {
    id: 60,
    title: "Live Music Jam Session",
    category: "Concerts",
    date: "Feb 15, 2025",
    time: "8:00 PM",
    venue: "Music Lounge",
    location: "Delhi",
    state: "Delhi",
    price: "₹799",
    rating: 4.6,
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Open mic and jam session",
    tags: ["live"]
  },
  {
    id: 61,
    title: "Live Art Creation",
    category: "Art",
    date: "Jan 30, 2025",
    time: "4:00 PM",
    venue: "Art Studio",
    location: "Pune",
    state: "Maharashtra",
    price: "₹1,200",
    rating: 4.7,
    image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Watch artists create masterpieces live",
    tags: ["live"]
  },
  {
    id: 62,
    title: "Live Podcast Recording",
    category: "Entertainment",
    date: "Feb 3, 2025",
    time: "7:30 PM",
    venue: "Studio Space",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹599",
    rating: 4.4,
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Be part of a live podcast recording",
    tags: ["live"]
  },
  {
    id: 63,
    title: "Live Cooking Show",
    category: "Lifestyle",
    date: "Jan 22, 2025",
    time: "6:00 PM",
    venue: "Culinary Studio",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹899",
    rating: 4.6,
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Interactive cooking experience with celebrity chefs",
    tags: ["live", "recommended"]
  },

  // Additional Popular Events
  {
    id: 64,
    title: "Fashion Week Finale",
    category: "Fashion",
    date: "Feb 20, 2025",
    time: "7:00 PM",
    venue: "Fashion Hub",
    location: "Mumbai",
    state: "Maharashtra",
    price: "₹3,500",
    rating: 4.8,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    description: "Grand finale of Mumbai Fashion Week",
    tags: ["popular"]
  },
  {
    id: 65,
    title: "New Year Celebration",
    category: "Party",
    date: "Dec 31, 2024",
    time: "9:00 PM",
    venue: "Rooftop Lounge",
    location: "Bangalore",
    state: "Karnataka",
    price: "₹2,999",
    rating: 4.9,
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    description: "Ring in the New Year with style",
    tags: ["popular"]
  }
];

// Combine static events with temporary events
export const getAllEventsWithTemp = (): Event[] => {
  const tempEvents = getTempEvents();
  return [...tempEvents, ...allEvents];
};

// States Database
export const states: State[] = [
  {
    name: 'Maharashtra',
    city: 'Mumbai',
    events: getAllEventsWithTemp().filter(event => event.state === 'Maharashtra').length,
    image: 'https://i.ibb.co/xt6hVHq3/download.jpg',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'Karnataka',
    city: 'Bangalore',
    events: getAllEventsWithTemp().filter(event => event.state === 'Karnataka').length,
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    name: 'Delhi',
    city: 'New Delhi',
    events: getAllEventsWithTemp().filter(event => event.state === 'Delhi').length,
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    name: 'Tamil Nadu',
    city: 'Chennai',
    events: getAllEventsWithTemp().filter(event => event.state === 'Tamil Nadu').length,
    image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    name: 'West Bengal',
    city: 'Kolkata',
    events: 8, // Placeholder for future events
    image: 'https://images.pexels.com/photos/1007427/pexels-photo-1007427.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Rajasthan',
    city: 'Jaipur',
    events: getAllEventsWithTemp().filter(event => event.state === 'Rajasthan').length,
    image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'Gujarat',
    city: 'Ahmedabad',
    events: 6, // Placeholder for future events
    image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Uttar Pradesh',
    city: 'Lucknow',
    events: 5, // Placeholder for future events
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    name: 'Telangana',
    city: 'Hyderabad',
    events: 7, // Placeholder for future events
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    name: 'Goa',
    city: 'Panaji',
    events: getAllEventsWithTemp().filter(event => event.state === 'Goa').length,
    image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=800',
    gradient: 'from-teal-500 to-green-500'
  }
];

// Database Query Functions
export const getEventsByTag = (tag: string): Event[] => {
  return getAllEventsWithTemp().filter(event => event.tags?.includes(tag));
};

export const getEventsByState = (stateName: string): Event[] => {
  return getAllEventsWithTemp().filter(event => event.state === stateName);
};

export const getEventsByLocation = (location: string): Event[] => {
  return getAllEventsWithTemp().filter(event => event.location === location);
};

export const getEventsByCategory = (category: string): Event[] => {
  // Handle special cases for category mapping
  const categoryMap: { [key: string]: string[] } = {
    'movies': ['Movies'],
    'concerts': ['Concerts'],
    'sports': ['Sports'],
    'theater': ['Theater'],
    'events': ['Events'],
    'gaming': ['Gaming'],
    'comedy': ['Comedy'],
    'lifestyle': ['Lifestyle'],
    'adventure': ['Adventure'],
    'fashion': ['Fashion'],
    'party': ['Party'],
    'literature': ['Literature'],
    'art': ['Art'],
    'entertainment': ['Entertainment'],
    'all': [] // Return all events for 'all' category
  };

  if (category === 'all') {
    return getAllEventsWithTemp();
  }

  const mappedCategories = categoryMap[category.toLowerCase()] || [category];
  return getAllEventsWithTemp().filter(event => 
    mappedCategories.some(cat => 
      event.category.toLowerCase() === cat.toLowerCase()
    )
  );
};

export const getFeaturedEvents = (): Event[] => {
  return getAllEventsWithTemp().filter(event => event.featured);
};

export const getEventById = (id: number): Event | undefined => {
  return getAllEventsWithTemp().find(event => event.id === id);
};

// Category-specific getters
export const getTrendingEvents = (): Event[] => getEventsByTag('trending');
export const getRecommendedEvents = (): Event[] => getEventsByTag('recommended');
export const getOutdoorEvents = (): Event[] => getEventsByTag('outdoor');
export const getPopularEvents = (): Event[] => getEventsByTag('popular');
export const getLiveEvents = (): Event[] => getEventsByTag('live');

// Search function
export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllEventsWithTemp().filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.category.toLowerCase().includes(lowercaseQuery) ||
    event.location.toLowerCase().includes(lowercaseQuery) ||
    event.venue.toLowerCase().includes(lowercaseQuery) ||
    event.description?.toLowerCase().includes(lowercaseQuery)
  );
};

// Category information for UI
export const categoryInfo = {
  movies: {
    title: 'Movies',
    subtitle: 'Latest blockbusters and cinema experiences',
    gradient: 'from-red-500 to-pink-500',
    icon: '🎬'
  },
  concerts: {
    title: 'Concerts',
    subtitle: 'Live music events and performances',
    gradient: 'from-purple-500 to-indigo-500',
    icon: '🎵'
  },
  sports: {
    title: 'Sports',
    subtitle: 'Cricket, football and sporting events',
    gradient: 'from-green-500 to-emerald-500',
    icon: '🏆'
  },
  theater: {
    title: 'Theater',
    subtitle: 'Plays, musicals and theatrical performances',
    gradient: 'from-yellow-500 to-orange-500',
    icon: '🎭'
  },
  events: {
    title: 'Events',
    subtitle: 'Workshops, conferences and special events',
    gradient: 'from-blue-500 to-cyan-500',
    icon: '📅'
  },
  gaming: {
    title: 'Gaming',
    subtitle: 'Esports tournaments and gaming events',
    gradient: 'from-violet-500 to-purple-500',
    icon: '🎮'
  },
  comedy: {
    title: 'Comedy',
    subtitle: 'Stand-up shows and comedy performances',
    gradient: 'from-pink-500 to-rose-500',
    icon: '😂'
  },
  lifestyle: {
    title: 'Lifestyle',
    subtitle: 'Food, wellness and lifestyle experiences',
    gradient: 'from-teal-500 to-green-500',
    icon: '💚'
  },
  trending: {
    title: 'Trending Now',
    subtitle: 'Most popular events this week',
    gradient: 'from-red-500 to-orange-500',
    icon: '🔥'
  },
  recommended: {
    title: 'Recommended for You',
    subtitle: 'Handpicked events based on your interests',
    gradient: 'from-yellow-500 to-amber-500',
    icon: '⭐'
  },
  outdoor: {
    title: 'Outdoor Events',
    subtitle: 'Adventure and outdoor experiences',
    gradient: 'from-green-500 to-emerald-500',
    icon: '🌲'
  },
  popular: {
    title: 'Popular Events',
    subtitle: 'Events everyone\'s talking about',
    gradient: 'from-pink-500 to-rose-500',
    icon: '🔥'
  },
  live: {
    title: 'Best of Live Events',
    subtitle: 'Unforgettable live experiences',
    gradient: 'from-purple-500 to-indigo-500',
    icon: '🎤'
  },
  all: {
    title: 'All Events',
    subtitle: 'Discover all amazing experiences',
    gradient: 'from-gray-600 to-gray-800',
    icon: '🌟'
  }
};