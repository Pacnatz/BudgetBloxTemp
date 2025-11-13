require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');
const authRoutes = require('./routes/authRoutes');
const { sendNotFound } = require('./utils/errors');

const uri = process.env.MONGODB_URI;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://budget-blox-main.vercel.app/'],
    methods: ['POST', 'GET'],
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRouter);
app.use('/api/expenses', expensesRouter);

mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb+srv://nhatchu0508_db_user:test123@cluster0.45izhif.mongodb.net/?appName=Cluster0',
);

app.use((req, res) => {
  sendNotFound(res, 'Requested resource not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
module.exports = app;
