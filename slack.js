const axios = require('axios');

async function sendToSlack(summary) {
  try {
    const response = await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `To-Do Summary: ${summary}`,
    });
    return response;
  } catch (error) {
    throw new Error('Failed to send to Slack: ' + error.message);
  }
}

module.exports = { sendToSlack };
