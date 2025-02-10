"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, userController_1.getUsers);
router.get('/:id', authMiddleware_1.authenticateToken, userController_1.getUserById);
router.put('/:id', authMiddleware_1.authenticateToken, userController_1.updateUser);
router.delete('/:id', authMiddleware_1.authenticateToken, userController_1.deleteUser);
exports.default = router;
