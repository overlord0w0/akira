"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // ✅ Тепер імпорт правильний
const router = express_1.default.Router();
router.get('/', postController_1.getPosts);
router.post('/', authMiddleware_1.authMiddleware, postController_1.createPost);
router.put('/:id', authMiddleware_1.authMiddleware, postController_1.updatePost);
router.delete('/:id', authMiddleware_1.authMiddleware, postController_1.deletePost);
exports.default = router;
