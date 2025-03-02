import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/Destination.js";
import { generateClueAndFact } from "../services/openaiService.js";

dotenv.config(); // Load .env variables

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const citiesToAdd = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "London, United Kingdom",
  "Sydney, Australia",
  "Rome, Italy",
  "Cairo, Egypt",
  "Rio de Janeiro, Brazil",
  "Moscow, Russia",
  "Dubai, UAE",
  "Bangkok, Thailand",
  "Berlin, Germany",
  "Toronto, Canada",
  "Cape Town, South Africa",
  "New Delhi, India",
  "Beijing, China",
  "Istanbul, Turkey",
  "Mexico City, Mexico",
  "Seoul, South Korea",
  "Singapore, Singapore",
  "Amsterdam, Netherlands",
  "Barcelona, Spain",
  "Los Angeles, USA",
  "Chicago, USA",
  "San Francisco, USA",
  "Hong Kong, China",
  "Shanghai, China",
  "Mumbai, India",
  "São Paulo, Brazil",
  "Buenos Aires, Argentina",
  "Vienna, Austria",
  "Prague, Czech Republic",
  "Budapest, Hungary",
  "Warsaw, Poland",
  "Athens, Greece",
  "Lisbon, Portugal",
  "Madrid, Spain",
  "Dublin, Ireland",
  "Edinburgh, Scotland",
  "Stockholm, Sweden",
  "Oslo, Norway",
  "Copenhagen, Denmark",
  "Helsinki, Finland",
  "Zurich, Switzerland",
  "Geneva, Switzerland",
  "Brussels, Belgium",
  "Luxembourg City, Luxembourg",
  "Monaco, Monaco",
  "Vatican City, Vatican City",
  "San Marino, San Marino",
  "Andorra la Vella, Andorra",
  "Reykjavik, Iceland",
  "Wellington, New Zealand",
  "Auckland, New Zealand",
  "Melbourne, Australia",
  "Perth, Australia",
  "Brisbane, Australia",
  "Adelaide, Australia",
  "Darwin, Australia",
  "Hobart, Australia",
  "Canberra, Australia",
  "Ottawa, Canada",
  "Vancouver, Canada",
  "Montreal, Canada",
  "Calgary, Canada",
  "Quebec City, Canada",
  "Halifax, Canada",
  "Winnipeg, Canada",
  "Edmonton, Canada",
  "Victoria, Canada",
  "Saskatoon, Canada",
  "Regina, Canada",
  "St. John's, Canada",
  "Yellowknife, Canada",
  "Whitehorse, Canada",
  "Iqaluit, Canada",
  "Anchorage, USA",
  "Honolulu, USA",
  "Las Vegas, USA",
  "Miami, USA",
  "Seattle, USA",
  "Boston, USA",
  "Washington, D.C., USA",
  "Philadelphia, USA",
  "Dallas, USA",
  "Houston, USA",
  "Atlanta, USA",
  "Phoenix, USA",
  "Denver, USA",
  "New Orleans, USA",
  "Nashville, USA",
];

// Helper function to generate random incorrect options
const getRandomOptions = (correctCity, allCities, count = 2) => {
  const incorrectCities = allCities.filter((city) => city !== correctCity);
  const randomOptions = [];

  for (let i = 0; i < count; i++) {
    if (incorrectCities.length === 0) break; // Stop if no more incorrect cities are available
    const randomIndex = Math.floor(Math.random() * incorrectCities.length);
    randomOptions.push(incorrectCities[randomIndex]);
    incorrectCities.splice(randomIndex, 1); // Avoid duplicates
  }

  // Fill remaining slots with placeholders if necessary
  while (randomOptions.length < count) {
    randomOptions.push("Unknown City");
  }

  return randomOptions;
};

// Helper function to add a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const expandDataset = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Get all cities for generating incorrect options
    const allCities = citiesToAdd.map((city) => city.split(", ")[0]);

    for (const city of citiesToAdd) {
      const [cityName, country] = city.split(", ");
      const { clues, funFact, trivia } = await generateClueAndFact(cityName);

      // Generate options
      const options = [cityName, ...getRandomOptions(cityName, allCities)];

      const destination = new Destination({
        city: cityName,
        country: country,
        clues: clues,
        funFact: funFact,
        trivia: trivia,
        options: options,
      });

      await destination.save();
      console.log(`✅ Added ${city} to the database`);

      // Add a delay of 5 seconds between API calls
      await delay(5000); // 5000ms = 5 seconds
    }
  } catch (err) {
    console.error("❌ Error expanding dataset:", err);
  } finally {
    mongoose.connection.close();
  }
};

expandDataset();