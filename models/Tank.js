module.exports = function (sequelize, DataTypes) {
    var Tank = sequelize.define('Tank', {
        //add properties here 
        name: DataTypes.STRING,
        
    })

    Tank.associate = function (models) {
        //add association here
        Tank.hasMany(models.Fish);
        Tank.belongsTo(models.User);
    }

    return Tank;
}