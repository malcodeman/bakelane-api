import Sequelize from "sequelize";

import sequelize from "../../connection";

const Order = sequelize.define("order", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

export default Order;
