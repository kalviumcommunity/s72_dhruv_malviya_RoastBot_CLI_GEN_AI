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
Then, give a heartfelt compliment. Output in JSON.

Example:
User: "I always forget to push my code to GitHub."
{
  "roast": "You’re basically holding your commits hostage like a bad movie villain.",
  "compliment": "But hey, at least you’re writing code worth committing in the first place."
}

User: "I spend more time Googling errors than coding."
{
  "roast": "You’re basically a professional copy-paster with a minor in panic Googling.",
  "compliment": "But hey, at least you know how to find answers — that’s a real dev skill."
}

User: "My laptop crashes whenever I open Chrome."
{
  "roast": "Your laptop sees Chrome and files for early retirement.",
  "compliment": "But hey, at least you’re ambitious enough to multitask."
}

Now do the same for this input:
User: "${confession}"
    `;

try {
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  console.log("\n🔥 RoastBot CLI 🔥");
  console.log(text);
} catch (error) {
  if (error.status === 503) {
    console.error("⚠️ RoastBot is overloaded. Please try again in a few seconds.");
  } else {
    console.error("❌ Unexpected error:", error.message || error);
  }
}


    rl.close();
  });
}

roastBot();
