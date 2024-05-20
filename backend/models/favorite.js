"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Favorite.belongsTo(models.User);
        }
    }
    Favorite.init(
        {
            myMangaId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            pictUrl: DataTypes.STRING,
            score: DataTypes.INTEGER,
            UserId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Favorite",
        }
    );
    return Favorite;
};
