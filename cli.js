#!/usr/bin/env node
// RoastBot CLI
// An AI-powered command line tool that roasts you brutally,
// then heals your soul with a wholesome compliment.

import 'dotenv/config';
import readline from 'readline';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Setup readline interface for CLI input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Use a lightweight generative model
const MODEL_NAME = "gemini-1.5-flash";
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

/**
 * roastBot
 * Prompts user for a confession, sends it to the model,
 * and prints a roast + compliment in JSON format.
 */
async function roastBot() {
  rl.question("👉 Spill your guts in one line: ", async (confession) => {
    const prompt = `
You are RoastBot, a savage yet kind AI. First, roast the user brutally based on their input.
Then, give a heartfelt compliment. Output strictly in JSON:

{
  "roast": "...",
  "compliment": "..."
}

User: "${confession}"
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      console.log("\n===========================");
      console.log("🔥 RoastBot CLI Activated 🔥");
      console.log("===========================\n");
      console.log(text);
    } catch (error) {
      console.error("⚠️ Oops! Something went wrong:", error);
    }

    rl.close();
  });
}

// Run the app
roastBot();
