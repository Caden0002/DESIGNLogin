const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: 'designlogin.cpwygia6ohc6.ap-southeast-2.rds.amazonaws.com', // Replace 'your-rds-endpoint' with the endpoint of your AWS RDS instance
  user: 'admin', // Replace 'your-username' with the username for your AWS RDS instance
  password: '7C&2Fp9*Lx', // Replace 'your-password' with the password for your AWS RDS instance
  database: 'DESIGNLogin',
  port: 3306,
});

const app = express();

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM Users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Login failed. Invalid username or password.' });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
