module.exports = function (sequelize, DataTypes) {
    var Fish = sequelize.define('Fish', {
        //add properties here 
        name: DataTypes.STRING,
        width: DataTypes.INTEGER,
        color: DataTypes.STRING
        
    })

    Fish.associate = function (models) {
        //add association here
        Fish.belongsTo(models.Tank);
        Fish.belongsTo(models.User);
    }

    return Fish;
}