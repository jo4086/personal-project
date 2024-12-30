const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                isBusiness: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                userId: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                    unique: true,
                },
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    unique: true,
                },
                nick: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                phone: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                withdrawal: {
                    type: Sequelize.STRING(25),
                    allowNull: true,
                    defaultValue: null,
                    unique: true,
                },
                refund: {
                    type: Sequelize.STRING(25),
                    allowNull: true,
                    defaultValue: null,
                    unique: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            },
        )
    }
    static associate(db) {
        db.User.hasMany(db.Address, {
            foreignKey: 'userId',
            sourceKey: 'id',
        })
        db.User.hasMany(db.Post, {
            foreignKey: 'userId',
            sourceKey: 'id'
        })
    }

    static hooks() {
        // beforeCreate 훅 설정
        this.addHook('beforeCreate', (user) => {
            if (!user.nick) {
                user.nick = user.userId; // nick이 없으면 userId를 기본값으로 설정
            }
        });
    }
}

