export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, HTTP-Referer, X-Title, X-OpenRouter-Api-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  async function readJsonOrText(response) {
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();

    if (contentType.includes('application/json')) {
      try {
        return { data: JSON.parse(text), rawText: text };
      } catch (error) {
        return { data: null, rawText: text, parseError: error };
      }
    }

    return { data: null, rawText: text };
  }

  const apiKey = String(req.headers['x-openrouter-api-key'] || process.env.OPENROUTER_API_KEY || '').trim();
  const authHeader = String(req.headers.authorization || '').trim();
  const bearerKey = authHeader.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : '';
  const resolvedApiKey = apiKey || bearerKey;
  if (!resolvedApiKey) {
    return res.status(500).json({
      error: { message: 'Missing OpenRouter API key. Add OPENROUTER_API_KEY in Vercel settings or config.js.' },
    });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resolvedApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.origin || req.headers.referer || 'https://review-app.vercel.app',
        'X-Title': 'Vandan Review Generator',
      },
      body: JSON.stringify(req.body),
    });

    const { data, rawText, parseError } = await readJsonOrText(response);
    if (parseError) {
      return res.status(502).json({
        error: { message: `OpenRouter returned invalid JSON: ${parseError.message}` },
      });
    }

    if (!data) {
      return res.status(502).json({
        error: { message: rawText ? `OpenRouter returned non-JSON response: ${rawText.slice(0, 120)}` : 'OpenRouter returned an empty response.' },
      });
    }

    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: { message: err.message || 'Proxy request failed' },
    });
  }
}
