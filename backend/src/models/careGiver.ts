import { DataTypes } from "sequelize";

import sequelize from "./db";

const Caregiver = sequelize.define(
  "Caregiver",
  {
    id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "test_caregivers",
    timestamps: false,
  }
);

export default Caregiver;
