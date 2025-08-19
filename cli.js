#!/usr/bin/env node
import 'dotenv/config';
import readline from 'readline';
import { GoogleGenerativeAI } from "@google/generative-ai";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function roastBot() {
    rl.question("Spill your guts in one line: ", async (confession) => {
        const prompt = `
You are RoastBot, a savage yet kind AI. 
Task: Given a user's one-line confession, respond with two parts:

1. A brutal roast that exaggerates their flaws in a humorous, sarcastic way.
2. A sincere compliment that uplifts them afterward.

Format the response strictly as valid JSON:

{
  "roast": "string",
  "compliment": "string"
}

Confession: "${confession}"
`;

        try {
            const result = await model.generateContent(prompt);
            const rawText = result.response.text();
            
            // Clean the response by removing Markdown code block formatting
            const jsonString = rawText.replace(/```json\n|\n```/g, '').trim();

            let responseData;
            try {
                responseData = JSON.parse(jsonString);
            } catch (jsonError) {
                console.error("Error: The API response was not valid JSON. Ensure the model returns a pure JSON object without extra text or formatting.", jsonError);
                console.log("Raw API Response:", rawText); // Log the raw response for debugging
                rl.close();
                return; 
            }

            console.log("\n🔥 RoastBot CLI 🔥");
            console.log("Roast:", responseData.roast);
            console.log("Compliment:", responseData.compliment);

        } catch (error) {
            console.error("Error:", error);
        }

        rl.close();
    });
}

roastBot();