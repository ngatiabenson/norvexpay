import { DataTypes, Model } from "sequelize";

export class User extends Model {}

export function initUserModel(sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: "merchant",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      indexes: [{ unique: true, fields: ["email"] }],
    }
  );

  return User;
}

