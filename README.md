# ⚡ RoastBot CLI

**RoastBot CLI** is a terminal-based AI that slaps you with brutal honesty before patching you up with wholesome validation. Think of it as the friend who dunks on your life choices but still shows up with ice cream afterward.

---

## 💡 What It Is

You confess a single, painfully real line about yourself (e.g., *"I spend more time Googling error messages than actually coding."*).
RoastBot replies with a perfectly balanced mix of pain and love:

1. **The Roast** – A savage, oddly personal burn that makes you wonder if the AI has been spying on your diary.

   > "Oh, so you're a professional Stack Overflow copy-paster? At this point, half your GitHub commits should list ChatGPT as a co-author."

2. **The Compliment** – A genuine boost to remind you you’re not a total mess.

   > "But hey, resourcefulness is a superpower. Knowing where to look is half the battle, and you’ve mastered it."

It’s an emotional rollercoaster, built to showcase how AI concepts like **Prompting, Structured Output, Function Calling, and RAG** can power something fun and interactive.

---

## 🧠 Core Concepts

### 🗣️ Prompting

The AI’s personality comes from carefully crafted prompts. It’s basically 90% Gordon Ramsay, 10% Bob Ross.
Instruction example:

> “Be ruthless, be hilarious, but don’t be offensive. End with something uplifting that hits as hard as the roast.”

---

### 🧾 Structured Output

Every response is delivered in neat JSON to keep the CLI predictable and hack-proof.

```json
{
  "roast": "Your debugging sessions last longer than most Netflix series.",
  "compliment": "But that persistence? That’s the hallmark of a true builder."
}
```

---

### ⚙️ Function Calling

The AI doesn’t just talk—it can tell the CLI to trigger little effects.

```json
{
  "roast": "You have the screen time of a TikTok teen but the posture of a retired grandpa.",
  "compliment": "Yet your curiosity keeps you young at heart.",
  "special_effect": "play_sad_violin"
}
```

This lets the CLI add spice—like showing an ASCII violin while your dignity melts away.

---

### 📚 RAG (Retrieval-Augmented Generation)

RoastBot has a **comedy + kindness vault** it can pull from, so responses aren’t just generic one-liners.

* **Step 1:** You confess (*“I procrastinate too much”*)
* **Step 2:** AI searches its roast/compliment vault for procrastination burns
* **Step 3:** It blends those with creativity to deliver a sharper, more relevant roast

Result: burns that sting *and* compliments that land.

---

## 🚧 Status

Still under construction 🚀 — being built as part of a mentor-guided AI project.

---
