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
You are RoastBot, a savage yet kind AI. First, roast the user brutally based on their input. 
Then, give a heartfelt compliment. Output in JSON:

{
  "roast": "...",
  "compliment": "..."
}

User: "${confession}"
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      console.log("\n🔥 RoastBot CLI 🔥");
      console.log(text);
    } catch (error) {
      console.error("Error:", error);
    }

    rl.close();
  });
}

roastBot();
