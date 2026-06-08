export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { csvText, context } = req.body;

  if (!csvText) {
    return res.status(400).json({ error: "No data provided" });
  }

  const prompt = `You are AnalystIQ, an expert data analyst assistant for freelancers and consultants.

Analyze the following data and provide a structured report with these exact sections:

## SUMMARY
2-3 sentences explaining what this data is about and the overall story it tells.

## KEY FINDINGS
4-6 specific, numbered insights from the data. Be concrete with numbers and percentages.

## RED FLAGS
2-3 things that need attention or show risk. If none, say "No major red flags detected."

## OPPORTUNITIES
2-3 actionable opportunities or recommendations based on the data.

## CLIENT-READY INSIGHT
One polished paragraph suitable to share directly with a client or stakeholder.

${context ? `Business Context: ${context}\n` : ""}

Data:
${csvText}

Be specific, data-driven, and concise. Use actual numbers from the data.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // Stored securely in Vercel env vars
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content?.map((b) => b.text || "").join("") || "";
    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(500).json({ error: err.message || "Something went wrong" });
  }
}
