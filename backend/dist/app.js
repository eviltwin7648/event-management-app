"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
require("dotenv").config();
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
console.log(path_1.default.join(__dirname, '../uploads'));
app.use("/user", userRoute_1.default);
app.use("/events", eventRoute_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is up and running on PORT:" + PORT);
});
