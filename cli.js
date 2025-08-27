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
    
    // 👇 Dynamic rules based on user input
    let extraRule = "";
    if (confession.split(" ").length < 5) {
      extraRule = "Roast them for being vague or lazy since their confession is too short.";
    } else if (/code|bug|github|error|program/i.test(confession)) {
      extraRule = "Roast them like a frustrated developer friend.";
    } else if (/sleep|food|gym|health|diet/i.test(confession)) {
      extraRule = "Roast them like a sarcastic life coach.";
    } else {
      extraRule = "Roast them in a witty general style.";
    }

    const prompt = `
You are RoastBot, a savage yet kind AI. First, roast the user brutally based on their input. 
Then, give a heartfelt compliment. Always output in JSON.

The user just confessed: "${confession}"

${extraRule}

Respond strictly in this format:
{
  "roast": "...",
  "compliment": "..."
}
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
