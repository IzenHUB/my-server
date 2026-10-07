"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const node_dns_1 = __importDefault(require("node:dns"));
const node_process_1 = require("node:process");
const envPath = node_path_1.default.join(__dirname, '../.env');
if ((0, node_fs_1.existsSync)(envPath)) {
    (0, node_process_1.loadEnvFile)(envPath);
}
node_dns_1.default.setServers(['1.1.1.1', '8.8.8.8']);
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (_req, res) => {
    res.send('Hello, World!');
});
exports.app.use(express_1.default.static(node_path_1.default.join(__dirname, '../public')));
exports.app.use("/api", UserRoutes_1.default);
exports.app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        database: mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
});
// Only connect and listen when run directly, not when imported by tests
// if (require.main === module) {
//   mongoose.connect("mongodb+srv://sthananarin_db_user:MC3sE1LJQ1PKdshy@cluster-cloud-deploy.clgpt1j.mongodb.net")
//     .then(() => {
//       console.log("Connected to MongoDB");
//       app.listen(3000, () => {
//         console.log("Server is running on http://localhost:3000");
//       });
//     })
//     .catch((error) => {
//       console.error("Error connecting to MongoDB:", error);
//     });
// }
if (require.main === module) {
    const port = Number(process.env.PORT) || 3000;
    exports.app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
