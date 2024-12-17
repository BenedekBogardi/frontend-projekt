const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web_projekt'
});

const sessionStore = new MySQLStore({}, db);

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

app.use(bodyParser.json());


app.use(session({
  key: 'session_cookie_name',
  secret: 'your_secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 60000 }
}));

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const [rowsname] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rowsname.length > 0) {
      return res.status(400).json({ message: 'A felhasználó már létezik!' });
    }
    const [rowsmail] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rowsmail.length > 0) {
      return res.status(400).json({ message: 'A megadott e-mail címmel már regisztráltak!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
    res.status(201).json({ message: 'Sikeres regisztráció!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Szerver hiba!' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Hibás bevitt adatok!' });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Hibás jelszó!' });
    }

    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'Sikeres bejelentkezés!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Szerver hiba' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Kijelentkezés sikertelen!' });
    }
    res.clearCookie('session_cookie_name');
    res.json({ message: 'Kijelentkezés sikeres!' });
  });
});

app.get('/protected', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ message: `Üdvözöllek, ${req.session.user.username}` });
});

app.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM products');
  
    const [rows] = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: rows,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Szerver hiba a termékek lekérésekor!' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

