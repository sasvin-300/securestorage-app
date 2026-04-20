const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ---------------- SERVE FRONTEND ---------------- */
app.use(express.static(path.join(__dirname, "../frontend")));

/* ---------------- HOME ROUTE ---------------- */
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});

/* ---------------- LOGIN API ---------------- */
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        return res.json({
            success: true,
            message: "Login successful"
        });
    }

    return res.json({
        success: false,
        message: "Invalid credentials"
    });
});

/* ---------------- FILE UPLOAD ---------------- */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.json({
            success: false,
            message: "No file uploaded"
        });
    }

    res.json({
        success: true,
        fileUrl: `http://localhost:3000/uploads/${req.file.filename}`
    });
});

/* ---------------- START SERVER ---------------- */
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});