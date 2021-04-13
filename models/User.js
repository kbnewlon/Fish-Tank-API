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

    return User;
};