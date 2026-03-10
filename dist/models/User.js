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
exports.User = void 0;
// src/models/User.ts
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
// 4. A Classe que estende o Model e implementa os atributos
class User extends sequelize_1.Model {
    // IMPLEMENTAÇÃO DO MÉTODO DE INSTÂNCIA
    // Ao definir dentro da classe, o TypeScript reconhece o método automaticamente
    checkPassword(password, callbackfn) {
        bcrypt_1.default.compare(password, this.password, (err, isSame) => {
            if (err) {
                callbackfn(err, false);
            }
            else {
                callbackfn(undefined, isSame);
            }
        });
    }
}
exports.User = User;
// 5. Inicialização do Modelo
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    birth: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [['admin', 'user']]
        }
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
        beforeSave: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.changed('password')) {
                const salt = yield bcrypt_1.default.genSalt(10);
                user.password = yield bcrypt_1.default.hash(user.password, salt);
            }
        })
    }
});
