const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    });

    User.associate = function (models) {
        //add association here
        User.hasMany(models.Tank);
        User.hasMany(models.Fish);
    };

    //uses bcrypt to encrypt password using auto generated salt 
    User.beforeCreate(function (user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};