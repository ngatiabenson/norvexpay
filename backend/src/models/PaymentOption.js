import { DataTypes, Model } from "sequelize";

export class PaymentOption extends Model {}

export function initPaymentOptionModel(sequelize) {
  PaymentOption.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.ENUM("bank_transfer", "mpesa", "card", "paypal"),
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "PaymentOption",
      tableName: "payment_options",
      timestamps: true,
    }
  );

  return PaymentOption;
}

