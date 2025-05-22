const Cohere = require('cohere-ai');
Cohere.init(process.env.COHERE_API_KEY);

async function summarizeTodos(tasks) {
  try {
    const prompt = `Summarize the following to-do list in a concise paragraph:\n${tasks.join('\n')}`;
    const response = await Cohere.generate({
      model: 'command-r-plus',
      prompt,
      max_tokens: 100,
      temperature: 0.7,
    });
    return response.body.generations[0].text.trim();
  } catch (error) {
    throw new Error('Failed to generate summary: ' + error.message);
  }
}

module.exports = { summarizeTodos };
