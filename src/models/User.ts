// src/models/User.ts
import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt';

// 1. Definição do Tipo de Callback
type CheckPasswordCallback = (err: Error | undefined, isSame: boolean) => void

// 2. Interface das propriedades do Usuário
interface UserAttributes {
  id: number
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user'
}

// 3. Atributos opcionais na criação (o ID é gerado pelo banco)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
export interface UserInstance  extends Model<UserAttributes, UserCreationAttributes>, User { }
// 4. A Classe que estende o Model e implementa os atributos
export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number
  public firstName!: string
  public lastName!: string
  public phone!: string
  public birth!: Date
  public email!: string
  public password!: string
  public role!: 'admin' | 'user'

  // Timestamps (opcional, adicione se o sequelize usar)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // IMPLEMENTAÇÃO DO MÉTODO DE INSTÂNCIA
  // Ao definir dentro da classe, o TypeScript reconhece o método automaticamente
  checkPassword(password: string, callbackfn: CheckPasswordCallback): void {
    bcrypt.compare(password, this.password, (err, isSame) => {
      if (err) {
        callbackfn(err, false)
      } else {
        callbackfn(undefined, isSame)
      }
    })
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
    beforeSave: async (user: User) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
})