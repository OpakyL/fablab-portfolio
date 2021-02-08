const config = require("config");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fileUpload = require("express-fileupload");
const { initTokens, router } = require("./routes/auth.routes");
const app = express();
const Ddos = require("ddos");
const authMiddleware = require("./middleware/auth.middleware");
app.use(express.json({ extended: true }));
app.use(cors());
const ddos = new Ddos({ burst: 100, limit: 150 });
app.use(ddos.express);
app.use(fileUpload());

app.use("/api/auth", router);
app.use("/api/media", require("./routes/media.routes"));
app.use("/api", require("./routes/courses.routes"));
app.use("/api", require("./routes/lessons.routes"));
app.use("/api", require("./routes/users.routes"));
app.use("/api", require("./routes/events.routes"));
app.use("/api", require("./routes/contacts.routes"));

app.get("/uploads/*", (req, res) => {
    res.sendFile(path.join(__dirname, req.url));
});

app.get("/defaults/*", (req, res) => {
    res.sendFile(path.join(__dirname, req.url));
});

const useStatic = () => {
        app.use("/", express.static(path.join(__dirname, "client", "dist")));

        app.get("*", (req, res) => {
            res.sendFile(
                path.resolve(__dirname, "client", "dist", "index.html")
            );
        });

        console.log("Using static files...");

};

const PORT = process.env.PORT || 8080;

async function start() {
    try {
        useStatic();
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        initTokens();
        console.log("Successfully connected to database");
        app.listen(PORT, () =>
            console.log(`App has been started on port ${PORT}...`)
        );
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();
