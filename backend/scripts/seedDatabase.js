import mongoose from "mongoose";
import Destination from "../models/Destination.js"; // Update the path if necessary
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const starterData = [
  {
    city: "Paris",
    country: "France",
    clues: [
      "This city is home to a famous tower that sparkles every night.",
      "Known as the 'City of Love' and a hub for fashion and art.",
    ],
    funFact: [
      "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
      "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
    ],
    trivia: [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia.",
    ],
    options: ["Paris", "Berlin", "Rome"],
  },
  {
    city: "Tokyo",
    country: "Japan",
    clues: [
      "This city has the busiest pedestrian crossing in the world.",
      "You can visit an entire district dedicated to anime, manga, and gaming.",
    ],
    funFact: [
      "Tokyo was originally a small fishing village called Edo before becoming the bustling capital it is today!",
      "More than 14 million people live in Tokyo, making it one of the most populous cities in the world.",
    ],
    trivia: [
      "The city has over 160,000 restaurants, more than any other city in the world.",
      "Tokyo’s subway system is so efficient that train delays of just a few minutes come with formal apologies.",
    ],
    options: ["Tokyo", "Seoul", "Beijing"],
  },
  {
    city: "New York",
    country: "USA",
    clues: [
      "Home to a green statue gifted by France in the 1800s.",
      "Nicknamed 'The Big Apple' and known for its Broadway theaters.",
    ],
    funFact: [
      "The Statue of Liberty was originally a copper color before oxidizing to its iconic green patina.",
      "Times Square was once called Longacre Square before being renamed in 1904.",
    ],
    trivia: [
      "New York City has 468 subway stations, making it one of the most complex transit systems in the world.",
      "The Empire State Building has its own zip code: 10118.",
    ],
    options: ["New York", "Los Angeles", "Chicago"],
  },
  {
    city: "London",
    country: "United Kingdom",
    clues: [
      "This city has a giant clock tower that is often mistaken for 'Big Ben.'",
      "It hosted the Summer Olympics three times, more than any other city.",
    ],
    funFact: [
      "The London Underground, also called the Tube, is the world’s first underground railway.",
      "London has more Indian restaurants than Mumbai or Delhi.",
    ],
    trivia: [
      "The Queen's Guard outside Buckingham Palace never smiles on duty.",
      "Tower Bridge is often confused with London Bridge, which is much simpler in design.",
    ],
    options: ["London", "Edinburgh", "Dublin"],
  },
  {
    city: "Sydney",
    country: "Australia",
    clues: [
      "This city is famous for an opera house with a unique sail-like design.",
      "A large harbor bridge here is nicknamed 'The Coathanger' due to its shape.",
    ],
    funFact: [
      "Sydney’s Bondi Beach was one of the first places in the world to introduce surf lifesaving.",
      "The Sydney Opera House was designed by a Danish architect who never saw it completed.",
    ],
    trivia: [
      "Kangaroos and emus are on Australia's coat of arms because they can’t walk backward.",
      "Sydney was originally a British penal colony in the 18th century.",
    ],
    options: ["Sydney", "Melbourne", "Brisbane"],
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    clues: [
      "Home to the world’s tallest building, standing at over 828 meters.",
      "This city transformed from a small fishing village to a global luxury hub in just a few decades.",
    ],
    funFact: [
      "The Burj Khalifa is so tall that people on the top floors see the sunset later than those at the bottom.",
      "Dubai has no rivers, yet it has some of the most advanced artificial water systems in the world.",
    ],
    trivia: [
      "The police force in Dubai uses luxury sports cars like Lamborghinis and Ferraris.",
      "Dubai’s Palm Jumeirah is an artificial island shaped like a palm tree.",
    ],
    options: ["Dubai", "Abu Dhabi", "Doha"],
  },
  {
    city: "Rio de Janeiro",
    country: "Brazil",
    clues: [
      "This city is famous for its giant Christ the Redeemer statue.",
      "It hosts one of the world’s largest Carnival festivals every year.",
    ],
    funFact: [
      "The famous Maracanã stadium once held a record attendance of nearly 200,000 people.",
      "Rio was the capital of Brazil before Brasília took over in 1960.",
    ],
    trivia: [
      "The name 'Rio de Janeiro' means 'River of January' in Portuguese, but it has no actual river.",
      "The city is home to one of the largest urban forests in the world, the Tijuca Forest.",
    ],
    options: ["Rio de Janeiro", "São Paulo", "Buenos Aires"],
  },
  {
    city: "Cairo",
    country: "Egypt",
    clues: [
      "This city is home to one of the Seven Wonders of the Ancient World.",
      "It is the largest city in Africa, both in population and area.",
    ],
    funFact: [
      "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years.",
      "Cairo has a museum with over 120,000 artifacts from ancient Egyptian history.",
    ],
    trivia: [
      "The city’s name in Arabic, 'Al-Qāhirah,' means 'The Victorious.'",
      "Cairo's metro system is one of the few in Africa and the first in the Middle East.",
    ],
    options: ["Cairo", "Istanbul", "Athens"],
  },
  {
    city: "Toronto",
    country: "Canada",
    clues: [
      "This city is home to the CN Tower, which was once the world's tallest free-standing structure.",
      "More than half of its residents are born outside of Canada.",
    ],
    funFact: [
      "Toronto's PATH system is the largest underground shopping complex in the world.",
      "The Toronto Raptors won their first NBA Championship in 2019, making history.",
    ],
    trivia: [
      "Toronto is often used as a stand-in for New York City in movies.",
      "The city has over 1,500 parks and green spaces.",
    ],
    options: ["Toronto", "Vancouver", "Montreal"],
  },
  {
    city: "Cape Town",
    country: "South Africa",
    clues: [
      "This city is known for a flat-topped mountain with breathtaking views.",
      "It was the first city in Africa to host the FIFA World Cup.",
    ],
    funFact: [
      "The Cape of Good Hope was originally called the 'Cape of Storms' by Portuguese explorers.",
      "Table Mountain is one of the oldest mountains in the world, estimated to be over 260 million years old.",
    ],
    trivia: [
      "Cape Town was founded as a supply station for Dutch ships traveling to Asia.",
      "The city is home to Boulders Beach, famous for its colony of African penguins.",
    ],
    options: ["Cape Town", "Johannesburg", "Nairobi"],
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing destinations...");
    await Destination.deleteMany({});
    console.log("✅ Cleared existing destinations");

    // Insert starter data
    console.log("Inserting starter data...");
    await Destination.insertMany(starterData);
    console.log("✅ Seeded database with starter data");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
  }
};

seedDatabase();
