require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. Опис структури даних (Модель)
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: "" },
  borderColor: { type: String, default: "#ccc" }, // Сюди піде твій градієнт
  textColor: { type: String, default: "#000" },   // Сюди піде твій градієнт
  devices: [{
    name: String,
    type: String,
    lastActive: String,
    deviceId: String
  }]
});

const User = mongoose.model('User', UserSchema);

const app = express();

// 2. Налаштування (Middleware)
app.use(cors());
app.use(express.json());

// 3. Підключення до твоєї нової бази в хмарі
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected до Cluster0!'))
  .catch(err => console.log('❌ Помилка підключення:', err));


// --- API ---
// Пошук користувачів
app.get('/api/users', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]}
      : {};
    const users = await User.find(query).limit(10);
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Помилка пошуку" });
  }
});

// Повертає пристрої поточного користувача (заглушка, без авторизації)
app.get('/api/devices/me', async (req, res) => {
  // Для тесту: повертаємо пристрої першого користувача
  const user = await User.findOne();
  res.json({ devices: user ? user.devices : [] });
});

// Реєстрація/логін з оновленням пристрою
app.post('/api/auth/login', async (req, res) => {
  const { email, firstName, currentDevice } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, firstName, devices: [] });
    }
    const deviceExists = user.devices.find(d => d.deviceId === currentDevice.deviceId);
    if (deviceExists) {
      deviceExists.lastActive = new Date().toLocaleString("uk-UA");
    } else {
      user.devices.push(currentDevice);
    }
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: "Помилка бази даних" });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Бекенд працює на http://localhost:${PORT}`);
});