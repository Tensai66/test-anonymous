const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./board.db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

db.serialize(() => {
  db.run(\`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0
  )\`);

  db.run(\`CREATE TABLE IF NOT EXISTS replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER,
    content TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(postId) REFERENCES posts(id)
  )\`);
});

app.get('/posts', (req, res) => {
  db.all(\`SELECT * FROM posts ORDER BY id DESC\`, [], (err, posts) => {
    if (err) return res.status(500).send(err);

    let postIds = posts.map(p => p.id);
    if (postIds.length === 0) return res.json(posts);

    db.all(\`SELECT * FROM replies WHERE postId IN (\${postIds.map(() => '?').join(',')})\`, postIds, (err, replies) => {
      if (err) return res.status(500).send(err);

      const repliesGrouped = {};
      replies.forEach(r => {
        if (!repliesGrouped[r.postId]) repliesGrouped[r.postId] = [];
        repliesGrouped[r.postId].push(r);
      });

      posts.forEach(p => {
        p.replies = (repliesGrouped[p.id] || []).slice(0, 3);
        p.totalReplies = (repliesGrouped[p.id] || []).length;
      });

      res.json(posts);
    });
  });
});

app.post('/post', (req, res) => {
  const { content } = req.body;
  db.run(\`INSERT INTO posts (content) VALUES (?)\`, [content], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ id: this.lastID });
  });
});

app.post('/reply', (req, res) => {
  const { postId, content } = req.body;
  db.run(\`INSERT INTO replies (postId, content) VALUES (?, ?)\`, [postId, content], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ id: this.lastID });
  });
});

app.post('/vote', (req, res) => {
  const { postId, type } = req.body;
  const field = type === 'up' ? 'upvotes' : 'downvotes';
  db.run(\`UPDATE posts SET \${field} = \${field} + 1 WHERE id = ?\`, [postId], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));