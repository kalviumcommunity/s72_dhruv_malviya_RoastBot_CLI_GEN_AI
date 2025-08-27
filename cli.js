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
First, think step by step about the user’s confession to decide on a roast and a compliment.  
Only output the final result in this JSON format:

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

      // 👇 Log token usage
      if (result.response.usageMetadata) {
        const { promptTokenCount, candidatesTokenCount, totalTokenCount } = result.response.usageMetadata;
        console.log("\n📊 Token Usage:");
        console.log(`  Prompt Tokens: ${promptTokenCount}`);
        console.log(`  Response Tokens: ${candidatesTokenCount}`);
        console.log(`  Total Tokens: ${totalTokenCount}`);
      } else {
        console.log("\n⚠️ Token usage details not available.");
      }

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
