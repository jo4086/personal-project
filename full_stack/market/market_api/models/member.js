const Sequelize = require('sequelize')

module.exports = class Member extends Sequelize.model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                isbusiness: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultvalue: false,
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
                    defaultValue: null,
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
                depositaccount: {
                    type: Sequelize.STRING(25),
                    allowNull: true,
                    unique: true,
                },
                refundaccount: {
                    type: Sequelize.STRING(25),
                    allowNull: true,
                    unique: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelname: 'Member',
                tablename: 'members',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            }
        )
    }
    static associate(db) {
        db.Member
    }

    static hooks() {
        // beforeCreate 훅 설정
        this.addHook('beforeCreate', (member) => {
            if (!member.nick) {
                member.nick = member.userId; // nick이 없으면 userId를 기본값으로 설정
            }
        });
    }
}
