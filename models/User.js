module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
     //add properties here 
        name: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                len: [8]
            },
        },
        email: DataTypes.STRING,
        unique: true

    });

    User.associate = function (models) {
        //add association here
    };

    return User;
};