const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                img: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                price: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                status: {
                    type: Sequelize.ENUM('active', 'sold', 'Reservation', 'in_transaction', 'purchasing', 'purchased'),
                    allowNull: true,
                },
                category: {
                    type: Sequelize.ENUM('free', 'sales', 'buy', 'info'), // 카테고리 구분
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Post',
                tableMame: 'posts',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            },
        )
    }
    static associate(db) {
       db.Post.belongsTo(db.User, {
          foreignKey: 'UserId',
          sourceKey: 'id'
        })
    }
}
