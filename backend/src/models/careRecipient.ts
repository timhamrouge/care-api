import { DataTypes } from "sequelize";

import sequelize from "./db";

const CareRecipient = sequelize.define(
  "CareRecipient",
  {
    id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "test_care_recipients",
    timestamps: false,
  }
);

export default CareRecipient;
