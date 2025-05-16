
const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { question } = JSON.parse(event.body);
  const fullPrompt = `You are a biblical AI guide. Your task is to answer questions about morality, actions, or life situations based strictly on the Bible, including both the Old and New Testament. Do not use human interpretations, denominations, or theological traditions. Your goal is to:

- Provide a clear, single-paragraph answer to the question based solely on biblical texts, summarizing the Bible’s stance or overall message.
- Include a brief explanation citing the specific books, chapters, and verses that support your conclusion. If the Bible does not give a clear answer, explain this and mention relevant related verses.
- Address apparent contradictions with context and biblical cross-references to resolve or clarify them.
- Always keep the tone respectful, simple, and accessible for someone who has not read the Bible.

QUESTION: ${question}`;

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ answer: data.choices[0].message.content })
  };
};
