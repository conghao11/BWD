import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
// import các router, middleware khác nếu có

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Cấu hình session nếu dùng
// app.use(session({...}));

// Định nghĩa API ở đây (nếu có)
app.get('/api/test', (req, res) => {
  res.json({ message: 'API đang hoạt động!' });
});

// ---- PHẦN QUAN TRỌNG: Serve React (Vite) frontend ----

// Fix __dirname khi dùng "type": "module"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve file tĩnh từ client/dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Nếu không khớp route API, thì trả về index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// -------------------------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
