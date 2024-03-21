import express from "express";
import mongoose from "mongoose";
import cors from "cors";

mongoose.connect("mongodb://127.0.0.1:27017/my_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5")
    .then(console.log("Connected to MongoDB Database"))
    .catch(err => console.log(err));

const schema = mongoose.Schema({
    guestName: String,
    guestEmail: String,
    roomNumber: Number,
    checkInDate: Date,
    checkOutDate: Date
});

const Reservation = mongoose.model("Reservation", schema);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/reservation/:id", async (req, res) => {
    try {
        const data = await Reservation.findById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/reservations", async (req, res) => {
    try {
        const data = await Reservation.find({});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.post("/reservations", async (req, res) => {
    try {
        console.log(req.body);
        const result = await Reservation.create(req.body);
        if (!result) {
            res.status(400).send({ message: "Failed to post reservation" });
        }
        else {
            res.status(201).send({ message: "Reservation created successfully!" });
        }
    } catch {
        res.status(500).send(error);
    }
});

app.delete("/reservation/:id", async (req, res) => {
    try {
        const result = await Reservation.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send({ message: 'Reservation not found' });
        }
        else {
            res.status(200).send({ message: "Reservation deleted successfully!" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put("/reservation/:id", async (req, res) => {
    try {
        const result = await Reservation.findByIdAndUpdate(req.params.id, req.body);
        if (!result) {
            res.status(404).send({ message: 'Reservation not found' });
        }
        else {
            res.status(200).send({ message: "Reservation updated successfully!" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})