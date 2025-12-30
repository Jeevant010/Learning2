const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { setupPassport } = require('./middleware/passport');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');

const PORT = process.env.PORT || 9090;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

// DB connect
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connect error', err);
    process.exit(1);
  });

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// Rate limit for admin
const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/admin', adminLimiter);

// Passport JWT
setupPassport(passport);
app.use(passport.initialize());

// Health
app.get('/', (req, res) => res.send('OK'));

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});