module.exports = function(sequelize, DataTypes) {
    let Burger = sequelize.define("Burger", {
        name: DataTypes.STRING(100),
        eaten: { type: DataTypes.BOOLEAN, defaultValue: false }
    })
    return Burger;
};