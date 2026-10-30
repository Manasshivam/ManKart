// ============================================================
// ManKart — Mock Data
// All data for shops, professionals, services, and marketplace
// ============================================================

const MANKART_DATA = {

  // ─── Shop Nearby ────────────────────────────────────────
  shopCategories: [
    { id: 'all', label: 'All', icon: '🏪' },
    { id: 'flowers', label: 'Flowers & Nursery', icon: '🌸' },
    { id: 'grocery', label: 'Grocery', icon: '🛒' },
    { id: 'pharmacy', label: 'Pharmacy', icon: '💊' },
    { id: 'electronics', label: 'Electronics', icon: '📱' },
    { id: 'hardware', label: 'Hardware', icon: '🔨' },
    { id: 'bakery', label: 'Bakery', icon: '🍞' },
    { id: 'clothing', label: 'Clothing', icon: '👕' },
    { id: 'auto', label: 'Auto Parts', icon: '🚗' },
    { id: 'pet', label: 'Pet Store', icon: '🐾' },
    { id: 'stationery', label: 'Stationery', icon: '✏️' },
    { id: 'furniture', label: 'Furniture', icon: '🛋️' },
  ],

  shops: [
    {
      id: 1, name: "Green Thumb Nursery", category: "flowers",
      categoryLabel: "Flowers & Nursery", emoji: "🌸",
      rating: 4.8, reviews: 312, distance: "0.4 km",
      distanceVal: 0.4, open: true, timing: "8:00 AM – 8:00 PM",
      address: "12, Rose Garden Lane, Sector 5",
      phone: "+91 98765 43210",
      tags: ["Indoor Plants", "Outdoor Plants", "Bouquets", "Pots"],
      description: "Premium nursery with over 500 varieties of plants, fresh flowers, pots, and gardening supplies."
    },
    {
      id: 2, name: "Fresh Basket Grocery", category: "grocery",
      categoryLabel: "Grocery", emoji: "🛒",
      rating: 4.5, reviews: 891, distance: "0.7 km",
      distanceVal: 0.7, open: true, timing: "7:00 AM – 10:00 PM",
      address: "45, Market Road, Block A",
      phone: "+91 98765 11111",
      tags: ["Fresh Produce", "Dairy", "Snacks", "Grains"],
      description: "Your neighbourhood grocery store with fresh produce, dairy, and daily essentials."
    },
    {
      id: 3, name: "MediCare Pharmacy", category: "pharmacy",
      categoryLabel: "Pharmacy", emoji: "💊",
      rating: 4.9, reviews: 540, distance: "0.3 km",
      distanceVal: 0.3, open: true, timing: "24 Hours",
      address: "8, Health Street, Near City Hospital",
      phone: "+91 98765 22222",
      tags: ["Medicines", "Healthcare", "Baby Care", "Vitamins"],
      description: "24x7 pharmacy with all prescription and OTC medicines, healthcare products."
    },
    {
      id: 4, name: "TechZone Electronics", category: "electronics",
      categoryLabel: "Electronics", emoji: "📱",
      rating: 4.3, reviews: 207, distance: "1.2 km",
      distanceVal: 1.2, open: false, timing: "10:00 AM – 8:00 PM",
      address: "22, Digital Plaza, Commercial Area",
      phone: "+91 98765 33333",
      tags: ["Mobiles", "Laptops", "Accessories", "Repair"],
      description: "Latest gadgets, mobile phones, laptops, and electronics accessories."
    },
    {
      id: 5, name: "BuildRight Hardware", category: "hardware",
      categoryLabel: "Hardware", emoji: "🔨",
      rating: 4.6, reviews: 183, distance: "0.9 km",
      distanceVal: 0.9, open: true, timing: "8:30 AM – 7:30 PM",
      address: "67, Industrial Area, Phase 2",
      phone: "+91 98765 44444",
      tags: ["Tools", "Paint", "Plumbing", "Electrical"],
      description: "Complete hardware store with tools, paints, plumbing fittings, and construction materials."
    },
    {
      id: 6, name: "Golden Crust Bakery", category: "bakery",
      categoryLabel: "Bakery", emoji: "🍞",
      rating: 4.7, reviews: 654, distance: "0.5 km",
      distanceVal: 0.5, open: true, timing: "6:00 AM – 9:00 PM",
      address: "3, Sweet Lane, Model Town",
      phone: "+91 98765 55555",
      tags: ["Bread", "Cakes", "Pastries", "Custom Cakes"],
      description: "Freshly baked breads, cakes, pastries and custom celebration cakes every day."
    },
    {
      id: 7, name: "Style Hub Clothing", category: "clothing",
      categoryLabel: "Clothing", emoji: "👕",
      rating: 4.4, reviews: 329, distance: "1.5 km",
      distanceVal: 1.5, open: false, timing: "10:00 AM – 9:00 PM",
      address: "101, Fashion Street, Central Market",
      phone: "+91 98765 66666",
      tags: ["Men", "Women", "Kids", "Ethnic"],
      description: "Trendy fashion for the whole family — western, ethnic, and casual wear."
    },
    {
      id: 8, name: "AutoSpares World", category: "auto",
      categoryLabel: "Auto Parts", emoji: "🚗",
      rating: 4.2, reviews: 118, distance: "2.0 km",
      distanceVal: 2.0, open: true, timing: "9:00 AM – 7:00 PM",
      address: "55, Workshop Road, Industrial Zone",
      phone: "+91 98765 77777",
      tags: ["Car Parts", "Bike Parts", "Oils", "Batteries"],
      description: "Wide range of genuine auto spare parts for cars, bikes, and commercial vehicles."
    },
    {
      id: 9, name: "Paws & Claws Pet Store", category: "pet",
      categoryLabel: "Pet Store", emoji: "🐾",
      rating: 4.8, reviews: 241, distance: "1.1 km",
      distanceVal: 1.1, open: true, timing: "9:00 AM – 8:00 PM",
      address: "78, Animal Welfare Road, Green Park",
      phone: "+91 98765 88888",
      tags: ["Pet Food", "Grooming", "Accessories", "Aquarium"],
      description: "Everything your pet needs — food, grooming, accessories, and aquarium supplies."
    },
    {
      id: 10, name: "Scholar's Stationery", category: "stationery",
      categoryLabel: "Stationery", emoji: "✏️",
      rating: 4.5, reviews: 176, distance: "0.6 km",
      distanceVal: 0.6, open: true, timing: "8:00 AM – 7:00 PM",
      address: "14, School Road, Education Hub",
      phone: "+91 98765 99999",
      tags: ["Books", "Art Supplies", "Office", "Gifts"],
      description: "Complete stationery shop — school supplies, office essentials, art materials, and gifts."
    },
    {
      id: 11, name: "Blossom Flower Shop", category: "flowers",
      categoryLabel: "Flowers & Nursery", emoji: "🌺",
      rating: 4.6, reviews: 198, distance: "0.8 km",
      distanceVal: 0.8, open: true, timing: "7:00 AM – 9:00 PM",
      address: "29, Garden Colony, Sector 9",
      phone: "+91 98765 12345",
      tags: ["Fresh Flowers", "Bouquets", "Garlands", "Decoration"],
      description: "Fresh flowers for all occasions — weddings, festivals, daily puja, and gifting."
    },
    {
      id: 12, name: "Home Nest Furniture", category: "furniture",
      categoryLabel: "Furniture", emoji: "🛋️",
      rating: 4.3, reviews: 92, distance: "2.5 km",
      distanceVal: 2.5, open: false, timing: "10:00 AM – 7:00 PM",
      address: "88, Furniture Market, Old City Road",
      phone: "+91 98765 54321",
      tags: ["Sofas", "Beds", "Wardrobes", "Custom"],
      description: "Quality furniture for every room — custom designs available at factory prices."
    }
  ],

  // ─── Book a Professional ────────────────────────────────
  professionalCategories: [
    { id: 'all', label: 'All', icon: '👥' },
    { id: 'electrician', label: 'Electrician', icon: '⚡' },
    { id: 'plumber', label: 'Plumber', icon: '🔧' },
    { id: 'carpenter', label: 'Carpenter', icon: '🪚' },
    { id: 'mechanic', label: 'Mechanic', icon: '🔩' },
    { id: 'painter', label: 'Painter', icon: '🖌️' },
    { id: 'cleaner', label: 'Cleaner', icon: '🧹' },
    { id: 'tutor', label: 'Tutor', icon: '📚' },
    { id: 'chef', label: 'Home Chef', icon: '👨‍🍳' },
  ],

  professionals: [
    {
      id: 1, name: "Rajesh Kumar", category: "electrician",
      categoryLabel: "Electrician", emoji: "⚡",
      rating: 4.9, reviews: 847, experience: "12 yrs",
      pricePerHr: 350, available: true,
      skills: ["Wiring", "Switchboard", "Fan Installation", "MCB Panel"],
      location: "Sector 4 Area", verified: true
    },
    {
      id: 2, name: "Suresh Patel", category: "plumber",
      categoryLabel: "Plumber", emoji: "🔧",
      rating: 4.7, reviews: 523, experience: "8 yrs",
      pricePerHr: 300, available: true,
      skills: ["Pipe Fitting", "Tap Repair", "Geyser Install", "Drain Cleaning"],
      location: "Central Area", verified: true
    },
    {
      id: 3, name: "Mohan Das", category: "carpenter",
      categoryLabel: "Carpenter", emoji: "🪚",
      rating: 4.8, reviews: 391, experience: "15 yrs",
      pricePerHr: 400, available: false,
      skills: ["Furniture Repair", "Door Fitting", "Wardrobe", "False Ceiling"],
      location: "East Zone", verified: true
    },
    {
      id: 4, name: "Vikram Singh", category: "mechanic",
      categoryLabel: "Mechanic", emoji: "🔩",
      rating: 4.6, reviews: 612, experience: "10 yrs",
      pricePerHr: 450, available: true,
      skills: ["Car Servicing", "Bike Repair", "Oil Change", "AC Repair"],
      location: "Workshop Area", verified: true
    },
    {
      id: 5, name: "Anand Sharma", category: "painter",
      categoryLabel: "Painter", emoji: "🖌️",
      rating: 4.5, reviews: 278, experience: "7 yrs",
      pricePerHr: 320, available: true,
      skills: ["Interior", "Exterior", "Texture Paint", "Waterproofing"],
      location: "South Area", verified: false
    },
    {
      id: 6, name: "Priya Cleaning Services", category: "cleaner",
      categoryLabel: "Cleaner", emoji: "🧹",
      rating: 4.8, reviews: 1024, experience: "5 yrs",
      pricePerHr: 250, available: true,
      skills: ["Deep Cleaning", "Kitchen Clean", "Bathroom", "Sofa Cleaning"],
      location: "All Areas", verified: true
    },
    {
      id: 7, name: "Prof. Arjun Nair", category: "tutor",
      categoryLabel: "Tutor", emoji: "📚",
      rating: 4.9, reviews: 438, experience: "9 yrs",
      pricePerHr: 500, available: true,
      skills: ["Math", "Science", "English", "IIT-JEE Prep"],
      location: "North Area", verified: true
    },
    {
      id: 8, name: "Chef Kavitha", category: "chef",
      categoryLabel: "Home Chef", emoji: "👨‍🍳",
      rating: 4.7, reviews: 315, experience: "6 yrs",
      pricePerHr: 600, available: false,
      skills: ["South Indian", "North Indian", "Baking", "Party Catering"],
      location: "All Areas", verified: true
    }
  ],

  // ─── Repair & Install ───────────────────────────────────
  repairCategories: [
    { id: 'all', label: 'All Services', icon: '🛠️' },
    { id: 'ac', label: 'AC', icon: '❄️' },
    { id: 'washing', label: 'Washing Machine', icon: '🫧' },
    { id: 'tv', label: 'TV / Display', icon: '📺' },
    { id: 'fridge', label: 'Refrigerator', icon: '🧊' },
    { id: 'geyser', label: 'Geyser / Water Heater', icon: '🚿' },
    { id: 'kitchen', label: 'Kitchen Appliances', icon: '🍳' },
    { id: 'cctv', label: 'CCTV / Security', icon: '📹' },
    { id: 'inverter', label: 'Inverter / Battery', icon: '🔋' },
  ],

  repairServices: [
    {
      id: 1, name: "AC Repair & Service", category: "ac", emoji: "❄️",
      services: ["General Service", "Gas Refill", "Deep Cleaning", "PCB Repair", "Installation"],
      basePrice: 499, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["LG", "Samsung", "Daikin", "Voltas", "Blue Star", "Hitachi", "Other"]
    },
    {
      id: 2, name: "Washing Machine Repair", category: "washing", emoji: "🫧",
      services: ["Not Spinning", "Noisy", "Leaking", "Not Starting", "Drum Repair"],
      basePrice: 349, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Haier", "Other"]
    },
    {
      id: 3, name: "TV & Display Repair", category: "tv", emoji: "📺",
      services: ["Screen Repair", "No Picture", "No Sound", "Motherboard", "HDMI Port"],
      basePrice: 399, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["Sony", "LG", "Samsung", "Mi", "OnePlus", "TCL", "Other"]
    },
    {
      id: 4, name: "Refrigerator Repair", category: "fridge", emoji: "🧊",
      services: ["Not Cooling", "Noisy", "Water Leaking", "Compressor", "Thermostat"],
      basePrice: 449, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["LG", "Samsung", "Whirlpool", "Haier", "Godrej", "Bosch", "Other"]
    },
    {
      id: 5, name: "Geyser Repair & Install", category: "geyser", emoji: "🚿",
      services: ["No Hot Water", "Leaking", "Heating Element", "Installation", "Annual Service"],
      basePrice: 299, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["Racold", "Havells", "AO Smith", "Bajaj", "Venus", "Crompton", "Other"]
    },
    {
      id: 6, name: "Kitchen Appliance Repair", category: "kitchen", emoji: "🍳",
      services: ["Mixer/Grinder", "Microwave", "Induction", "Chimney", "Water Purifier"],
      basePrice: 249, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["Prestige", "Bajaj", "Philips", "Bosch", "LG", "Kent", "Other"]
    },
    {
      id: 7, name: "CCTV Installation & Repair", category: "cctv", emoji: "📹",
      services: ["New Installation", "Camera Repair", "DVR Setup", "Cable Routing", "AMC"],
      basePrice: 599, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["CP Plus", "Hikvision", "Dahua", "Bosch", "Honeywell", "Other"]
    },
    {
      id: 8, name: "Inverter & Battery Service", category: "inverter", emoji: "🔋",
      services: ["Battery Replacement", "Inverter Repair", "New Installation", "AMC"],
      basePrice: 399, timeSlots: ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"],
      brands: ["Luminous", "Exide", "Amaron", "Su-Kam", "Microtek", "Other"]
    }
  ],

  // ─── Marketplace ────────────────────────────────────────
  marketCategories: [
    { id: 'all', label: 'All', icon: '🛒' },
    { id: 'fruits', label: 'Fruits', icon: '🍎' },
    { id: 'vegetables', label: 'Vegetables', icon: '🥦' },
    { id: 'dairy', label: 'Dairy', icon: '🥛' },
    { id: 'snacks', label: 'Snacks', icon: '🍿' },
    { id: 'beverages', label: 'Beverages', icon: '🥤' },
    { id: 'personal', label: 'Personal Care', icon: '🧴' },
    { id: 'household', label: 'Household', icon: '🧽' },
    { id: 'electronics', label: 'Electronics', icon: '🔌' },
  ],

  marketProducts: [
    { id: 1, name: "Fresh Bananas", category: "fruits", emoji: "🍌", price: 49, originalPrice: 65, unit: "1 dozen", inStock: true, discount: 25, deliveryTime: "15 min", rating: 4.6, reviews: 312 },
    { id: 2, name: "Red Apples", category: "fruits", emoji: "🍎", price: 149, originalPrice: 179, unit: "1 kg", inStock: true, discount: 17, deliveryTime: "15 min", rating: 4.7, reviews: 524 },
    { id: 3, name: "Fresh Tomatoes", category: "vegetables", emoji: "🍅", price: 39, originalPrice: 55, unit: "1 kg", inStock: true, discount: 29, deliveryTime: "10 min", rating: 4.4, reviews: 218 },
    { id: 4, name: "Spinach Bunch", category: "vegetables", emoji: "🥬", price: 25, originalPrice: 35, unit: "1 bunch", inStock: true, discount: 29, deliveryTime: "10 min", rating: 4.5, reviews: 187 },
    { id: 5, name: "Amul Gold Milk", category: "dairy", emoji: "🥛", price: 31, originalPrice: 31, unit: "500 ml", inStock: true, discount: 0, deliveryTime: "20 min", rating: 4.8, reviews: 1204 },
    { id: 6, name: "Amul Butter", category: "dairy", emoji: "🧈", price: 65, originalPrice: 68, unit: "100 g", inStock: true, discount: 4, deliveryTime: "20 min", rating: 4.9, reviews: 892 },
    { id: 7, name: "Lay's Magic Masala", category: "snacks", emoji: "🍿", price: 20, originalPrice: 20, unit: "73 g", inStock: true, discount: 0, deliveryTime: "10 min", rating: 4.5, reviews: 743 },
    { id: 8, name: "Bingo! Mad Angles", category: "snacks", emoji: "🍟", price: 20, originalPrice: 20, unit: "75 g", inStock: true, discount: 0, deliveryTime: "10 min", rating: 4.4, reviews: 512 },
    { id: 9, name: "Coca-Cola", category: "beverages", emoji: "🥤", price: 40, originalPrice: 40, unit: "750 ml", inStock: true, discount: 0, deliveryTime: "10 min", rating: 4.7, reviews: 1087 },
    { id: 10, name: "Lipton Green Tea", category: "beverages", emoji: "🍵", price: 130, originalPrice: 150, unit: "25 bags", inStock: true, discount: 13, deliveryTime: "15 min", rating: 4.6, reviews: 438 },
    { id: 11, name: "Dove Shampoo", category: "personal", emoji: "🧴", price: 189, originalPrice: 225, unit: "340 ml", inStock: true, discount: 16, deliveryTime: "25 min", rating: 4.7, reviews: 623 },
    { id: 12, name: "Colgate MaxFresh", category: "personal", emoji: "🪥", price: 99, originalPrice: 115, unit: "150 g", inStock: true, discount: 14, deliveryTime: "15 min", rating: 4.8, reviews: 904 },
    { id: 13, name: "Vim Dishwash Bar", category: "household", emoji: "🧽", price: 25, originalPrice: 30, unit: "200 g", inStock: true, discount: 17, deliveryTime: "20 min", rating: 4.5, reviews: 341 },
    { id: 14, name: "Harpic Toilet Cleaner", category: "household", emoji: "🚽", price: 99, originalPrice: 120, unit: "500 ml", inStock: true, discount: 17, deliveryTime: "20 min", rating: 4.6, reviews: 278 },
    { id: 15, name: "USB Type-C Cable", category: "electronics", emoji: "🔌", price: 149, originalPrice: 299, unit: "1 m", inStock: true, discount: 50, deliveryTime: "30 min", rating: 4.3, reviews: 512 },
    { id: 16, name: "Phone Stand", category: "electronics", emoji: "📱", price: 99, originalPrice: 199, unit: "1 piece", inStock: false, discount: 50, deliveryTime: "30 min", rating: 4.4, reviews: 287 },
    { id: 17, name: "Mango Slice", category: "fruits", emoji: "🥭", price: 89, originalPrice: 110, unit: "500 g", inStock: true, discount: 19, deliveryTime: "15 min", rating: 4.8, reviews: 761 },
    { id: 18, name: "Onions", category: "vegetables", emoji: "🧅", price: 45, originalPrice: 60, unit: "1 kg", inStock: true, discount: 25, deliveryTime: "10 min", rating: 4.3, reviews: 198 },
    { id: 19, name: "Greek Yogurt", category: "dairy", emoji: "🫙", price: 89, originalPrice: 99, unit: "400 g", inStock: true, discount: 10, deliveryTime: "20 min", rating: 4.7, reviews: 334 },
    { id: 20, name: "Haldiram's Bhujia", category: "snacks", emoji: "🌾", price: 99, originalPrice: 110, unit: "200 g", inStock: true, discount: 10, deliveryTime: "10 min", rating: 4.8, reviews: 1102 },
  ]
};
