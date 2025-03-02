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
    options: ["Paris", "Berlin", "Rome"], // Correct city + 2 random incorrect cities
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
    options: ["Tokyo", "Seoul", "Beijing"], // Correct city + 2 random incorrect cities
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
    options: ["New York", "Los Angeles", "Chicago"], // Correct city + 2 random incorrect cities
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