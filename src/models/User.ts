import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";

export enum UserRole {
  DE = "delegate", // Organization delegate
  RLE = "manager" // Organization manager
}

export class User extends Model {
  public fiscalCode!: string; // PK
  public firstName!: string;
  public familyName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    familyName: {
      allowNull: false,
      type: new DataTypes.STRING()
    },
    firstName: {
      allowNull: false,
      type: new DataTypes.STRING()
    },
    fiscalCode: {
      allowNull: false,
      primaryKey: true,
      type: new DataTypes.STRING()
    }
  },
  {
    modelName: "User",
    paranoid: true,
    sequelize,
    tableName: "Users",
    timestamps: true
  }
);
