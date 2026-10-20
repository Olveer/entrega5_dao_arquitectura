import express from "express";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";

const app = express();

app.use(express.json());

app.use("/api/services", servicesRouter);
app.use("/api/bookings", bookingsRouter);

// Traduce los errores de las capas internas a respuestas HTTP
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: "JSON inválido en el body" });
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ errors: err.errors });
    }
    if (err.name === "NotFoundError") {
        return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
});

export default app;