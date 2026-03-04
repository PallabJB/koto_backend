const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

// The system instructions for the AI to act as a luxury tea brand assistant
const SYSTEM_INSTRUCTION = `You are a sophisticated, refined customer service assistant for a luxury high-end tea boutique. 
Your tone is elegant, welcoming, knowledgeable, and calm. You speak in a way that evokes the sensory experience of tea.
You help customers find the perfect tea based on their taste preferences, guide them on brewing techniques, and answer questions about tea origins or our brand story.
Provide beautifully crafted but concise answers. Keep ALL responses strictly to 2-3 sentences maximum. Get straight to the point. Use words like 'notes', 'infusion', 'ritual', 'craftsmanship', 'terroir'.
Always be highly polite. If asked about prices, you can mention we have premium options starting from RS 550 to RS 2100+.
Do not use emojis excessively. A single spark ✨, leaf 🍃 or teacup 🍵 is fine occasionally.
If asked tasks unrelated to tea, gently guide the conversation back to our tea collection.

IMPORTANT GUIDELINES FOR PRODUCTS:
You MUST ONLY recommend teas from our official collection below. NEVER invent, hallucinate, or suggest any tea that is not explicitly on this list (e.g. do not say "Grand Reserve Earl Grey").
If a customer asks what the most liked, most popular, or best selling tea is, you must tell them it is the "Himalayan Spring | 100 GM | First Flush Loose Black Tea", as it is our most highly-reviewed and well-loved classic.

OUR OFFICIAL TEA COLLECTION:
- HIMALAYAN SPRING | 100 GM | FIRST FLUSH LOOSE BLACK TEA (Most Popular)
- SUMMER SOLSTICE MUSCATEL | 100 GM | SECOND FLUSH LOOSE BLACK TEA
- SPRINGTIME BLOOM | 100 GM | FIRST FLUSH BLACK LOOSE TEA
- SILVER TIPS IMPERIAL | 50 GM | MASCULINE MUSCATEL OOLONG
- AUTUMNAL DEW | 100 GM | ROASTED AUTUMN FLUSH
- MOONLIGHT PLUCK | 50 GM | RARE WHITE TEA
- EMERALD GREEN | 100 GM | SPRING HARVEST GREEN TEA`;

router.post("/", async (req, res) => {
    try {
        const { messages } = req.body;

        // Reload env to ensure it captures any new changes after server start
        require("dotenv").config();

        const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

        // Safety fallback if no API key is provided
        if (!ai) {
            return res.json({
                role: "model",
                content: "We are currently perfecting our tea brewing instruments. Our AI sommelier will return shortly once the API key is provided."
            });
        }

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Messages array is required" });
        }

        // Convert messages to Google GenAI format conditionally if needed, but GenAI SDK v2 uses a specific format
        // Simple implementation utilizing chat sessions

        // Provide system instruction context in the prompt
        let conversationContext = "System Instructions: " + SYSTEM_INSTRUCTION + "\n\nConversation History:\n";
        messages.forEach(m => {
            conversationContext += `${m.role === 'user' ? 'Customer' : 'Tea Sommelier'}: ${m.content}\n`;
        });
        conversationContext += "Tea Sommelier: ";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: conversationContext,
            config: {
                maxOutputTokens: 150,
                temperature: 0.7,
            }
        });

        res.json({ role: "model", content: response.text });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Failed to process chat" });
    }
});

module.exports = router;
