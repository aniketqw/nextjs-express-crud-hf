const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'data', 'posts.json');

app.use(cors());
app.use(express.json());

async function initData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ posts: [], nextId: 1 }, null, 2));
  }
}

async function readData() {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/posts', async (req, res) => {
  const data = await readData();
  res.json(data.posts);
});

app.get('/api/posts/:id', async (req, res) => {
  const data = await readData();
  const post = data.posts.find(p => p.id === parseInt(req.params.id));
  post ? res.json(post) : res.status(404).json({ error: 'Not found' });
});

app.post('/api/posts', async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ error: 'Title and body required' });
  const data = await readData();
  const newPost = {
    id: data.nextId++,
    title, body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.posts.push(newPost);
  await writeData(data);
  res.status(201).json(newPost);
});

app.put('/api/posts/:id', async (req, res) => {
  const { title, body } = req.body;
  const postId = parseInt(req.params.id);
  const data = await readData();
  const idx = data.posts.findIndex(p => p.id === postId);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.posts[idx] = { ...data.posts[idx], title, body, updatedAt: new Date().toISOString() };
  await writeData(data);
  res.json(data.posts[idx]);
});

app.delete('/api/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id);
  const data = await readData();
  const idx = data.posts.findIndex(p => p.id === postId);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.posts.splice(idx, 1);
  await writeData(data);
  res.status(204).send();
});

app.get('/health', (req, res) => res.json({ status: 'OK' }));

initData().then(() => {
  app.listen(PORT, () => console.log(`API running on :${PORT}`));
});
