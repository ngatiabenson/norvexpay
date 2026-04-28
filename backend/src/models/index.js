import { sequelize } from "../db/sequelize.js";
import { initUserModel, User } from "./User.js";
import { initTransactionModel, Transaction } from "./Transaction.js";
import { initPaymentOptionModel, PaymentOption } from "./PaymentOption.js";

initUserModel(sequelize);
initTransactionModel(sequelize);
initPaymentOptionModel(sequelize);

// Associations
User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

export { sequelize, User, Transaction, PaymentOption };

