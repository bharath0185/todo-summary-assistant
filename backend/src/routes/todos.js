const express = require('express');
const { supabase } = require('../services/supabase');
const { summarizeTodos } = require('../services/cohere');
const { sendToSlack } = require('../services/slack');

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add a todo
router.post('/', async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task is required' });
  const { data, error } = await supabase.from('todos').insert([{ task, completed: false }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Todo deleted' });
});

// Summarize and send to Slack
router.post('/summarize', async (req, res) => {
  try {
    const { data, error } = await supabase.from('todos').select('task').eq('completed', false);
    if (error) throw new Error(error.message);
    if (!data.length) return res.json({ message: 'No pending todos to summarize' });

    const tasks = data.map((todo) => todo.task);
    const summary = await summarizeTodos(tasks);
    const slackResponse = await sendToSlack(summary);

    if (slackResponse.status === 200) {
      res.json({ message: 'Summary sent to Slack', summary });
    } else {
      res.status(500).json({ error: 'Failed to send summary to Slack' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
