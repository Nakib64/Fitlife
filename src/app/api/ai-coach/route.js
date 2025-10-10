export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", 
        messages: [
          {
            role: "system",
            content: "You are a friendly AI Fitness Coach. Give short, clear, motivational answers.",
          },
          ...messages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        ],
      }),
    });

    const data = await response.json();

    const aiReply = data?.choices?.[0]?.message?.content || "⚠️ Sorry, I couldn’t generate a reply.";

    return new Response(JSON.stringify({ reply: aiReply }), { status: 200 });
  } catch (err) {
    console.error("AI Coach API Error:", err);
    return new Response(JSON.stringify({ error: "Failed to get AI response" }), { status: 500 });
  }
}
