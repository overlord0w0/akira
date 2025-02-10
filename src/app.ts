import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!MONGO_URI || !SESSION_SECRET) {
    console.error("❌ MONGO_URI або SESSION_SECRET не визначені у .env!");
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true })); // Налаштуй origin під свій фронтенд
app.use(morgan("dev")); // Логування запитів у консоль

// Налаштування сесій
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: MONGO_URI }),
        cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 день
    })
);

// Маршрути
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Головний маршрут
app.get("/", (req, res) => {
    res.send("🚀 API працює!");
});

// Підключення до MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB підключено");
        app.listen(PORT, () => console.log(`🚀 Сервер працює на порті ${PORT}`));
    })
    .catch((err) => {
        console.error("❌ Помилка підключення до MongoDB:", err);
        process.exit(1);
    });

// Обробка необроблених помилок
process.on("unhandledRejection", (err) => {
    console.error("❌ Виникла необроблена помилка:", err);
    process.exit(1);
});
