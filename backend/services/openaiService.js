import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateClueAndFact = async (destination, retries = 3, delayMs = 10000) => {
  const prompt = `
    Generate a cryptic clue, a fun fact, and trivia about ${destination}.
    Return the response in JSON format with the following keys:
    - clues (an array of 2 cryptic clues)
    - funFact (an array of 2 fun facts)
    - trivia (an array of 2 trivia facts)
  `;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
      });

      // Extract the response content
      const content = response.choices[0].message.content;

      // Parse the response into JSON
      let data;
      try {
        data = JSON.parse(content);
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError);
        throw new Error("Failed to parse OpenAI response.");
      }

      // Ensure the response has the required fields
      if (!data.clues || !data.funFact || !data.trivia) {
        throw new Error("OpenAI response is missing required fields.");
      }

      return data;
    } catch (error) {
      if (error.status === 429 && i < retries - 1) {
        // Retry after a longer delay if rate limit is exceeded
        console.log(`Rate limit exceeded. Retrying in ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        console.error("Error generating clue:", error);
        return {
          clues: ["No clue available. Please try again."],
          funFact: ["No fun fact available. Please try again."],
          trivia: ["No trivia available. Please try again."],
        };
      }
    }
  }
};

export { generateClueAndFact };