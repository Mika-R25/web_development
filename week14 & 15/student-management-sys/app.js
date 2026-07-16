import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/students", studentRoutes);




// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Student Management API Running 🚀"
    });
});

// Health Check Endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "Student Management API"
    });
});

// Test Koneksi Database
app.get("/test-db", async (req, res) => {

    try {

        const connection = await db.getConnection();

        const [rows] = await connection.query("SELECT NOW() AS waktu");

        connection.release();

        res.json({
                "success": true,
                "message": "API Student Management - Praktikum Pemrograman Dasar",
                "developer": "M. Mika Rahil"
}
);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("==================================");
    console.log(" Student Management System");
    console.log("==================================");
    console.log(`Server Running : http://localhost:${PORT}`);
    console.log("Database : MySQL");
    console.log("==================================");

});
