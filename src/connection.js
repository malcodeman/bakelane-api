import Sequelize from "sequelize";
import path from "path";

import utils from "./utils";
import { DB } from "./constants";

utils.makeDirectory(DB.FOLDER_NAME);

const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  host: "0.0.0.0",
  dialect: "sqlite",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: path.join(`${DB.FOLDER_NAME}/${DB.FILE_NAME}`)
});

sequelize.sync({ force: true });

async function authenticate() {
  await sequelize.authenticate();
}

try {
  authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
