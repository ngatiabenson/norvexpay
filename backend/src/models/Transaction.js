import { DataTypes, Model } from "sequelize";

export class Transaction extends Model {}

export function initTransactionModel(sequelize) {
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      reference: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "KES",
      },
      amount: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
      },
      fee: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false,
        defaultValue: 0,
      },
      method: {
        type: DataTypes.ENUM("bank_transfer", "mpesa", "card", "paypal"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "succeeded", "failed", "refunded"),
        allowNull: false,
        defaultValue: "pending",
      },
      customerName: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      customerEmail: {
        type: DataTypes.STRING(320),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      timestamps: true,
      indexes: [{ fields: ["userId", "createdAt"] }],
    }
  );

  return Transaction;
}

