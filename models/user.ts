import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class User extends Model {
  declare id: number;
  declare name: string;
  declare otp: string | null;
  declare otp_expiration_date: Date;
  declare phone_number: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    otp: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      validate: {
        isNumeric:true
      },
    },
    otp_expiration_date: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
    phone_number: {
      type: new DataTypes.STRING(),
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.sync().then(() => {
   console.log("Synced with database")
}).catch((err) => {
  console.error(err);
 });

export default User;
