import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './UserRoutes';

export const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api", userRouter);

// Only connect and listen when run directly, not when imported by tests
if (require.main === module) {
  mongoose.connect("mongodb+srv://<username>:<password>@cluster0.wv8ns0h.mongodb.net/")
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
