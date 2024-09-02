"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = createNewUser;
exports.findUser = findUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function createNewUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, email, password, firstName, lastName, }) {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const res = yield prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    email,
                    firstName,
                    lastName,
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error Creating User", error);
            throw error;
        }
    });
}
function findUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return null;
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (isMatch) {
                return user;
            }
            return null;
        }
        catch (error) {
            console.log("Error finding User", error);
            throw error;
        }
    });
}
function updateUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, username, password, firstName, lastName, }) {
        try {
            const data = {};
            if (username !== undefined) {
                data.username = username;
            }
            if (password !== undefined) {
                data.password = yield bcrypt_1.default.hash(password, 10);
            }
            if (firstName !== undefined) {
                data.firstName = firstName;
            }
            if (lastName !== undefined) {
                data.lastName = lastName;
            }
            const res = yield prisma.user.update({
                where: {
                    id: id,
                },
                data: data,
            });
            return res;
        }
        catch (error) {
            console.log("Error Updating User", error);
            throw error;
        }
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.delete({
                where: {
                    id: id,
                },
            });
            return res;
        }
        catch (error) {
            console.log("Error Deleting User", error);
            throw error;
        }
    });
}
