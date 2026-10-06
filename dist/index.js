"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.send('Hello, World!');
});
exports.app.use("/api", UserRoutes_1.default);
// Only connect and listen when run directly, not when imported by tests
if (require.main === module) {
    mongoose_1.default.connect("mongodb+srv://kitichetph_db_user:TShADBRqiLlMhebY@cluster0.wv8ns0h.mongodb.net/")
        .then(() => {
        console.log("Connected to MongoDB");
        exports.app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
}
