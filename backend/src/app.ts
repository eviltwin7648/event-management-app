import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
import eventsRoute from "./routes/eventRoute";
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('./uploads'));

app.use("/user", userRoute);
app.use("/events", eventsRoute);



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log("Server is up and running on PORT:" + PORT);
});


 
 
 
