const express = require("express");
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const cors = require("cors");
// const db = require("./db.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

/* app.get("/getMysqlStatus", (req, res) => {
  db.ping((err) => {
    if (err) return res.status(500).send("MySQL Server is Down");

    res.send("MySQL Server is Active");
  });
}); */

app.listen(8080, () => {
  console.log("Server started");
});
