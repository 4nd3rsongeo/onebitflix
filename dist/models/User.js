// src/models/User.ts
import { sequelize } from '../database/index.js';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
// 4. A Classe que estende o Model e implementa os atributos
export class User extends Model {
    // IMPLEMENTAÇÃO DO MÉTODO DE INSTÂNCIA
    // Ao definir dentro da classe, o TypeScript reconhece o método automaticamente
    checkPassword(password, callbackfn) {
        bcrypt.compare(password, this.password, (err, isSame) => {
            if (err) {
                callbackfn(err, false);
            }
            else {
                callbackfn(undefined, isSame);
            }
        });
    }
}
// 5. Inicialização do Modelo
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    birth: {
        allowNull: false,
        type: DataTypes.DATE
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isIn: [['admin', 'user']]
        }
    }
}, {
    sequelize,
    modelName: 'User', // Nome do modelo
    tableName: 'users', // Nome da tabela no banco
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});
