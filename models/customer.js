module.exports = function(sequelize, DataTypes) {
    let Customer = sequelize.define("Customer", {
        name: DataTypes.STRING(100),
    });
    Customer.associate = function(models) {
        Customer.hasMany(models.Burger, {
            onDelete: "cascade"
        });
    };
    return Customer;
};