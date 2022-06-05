import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("mysql://root:@localhost:3306/user");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


export default sequelize;