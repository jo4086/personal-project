const Sequelize = require('sequelize')



module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
           {
              postTitle: {
                 type: Sequelize.STRING(255),
                 allowNull: false,
              },
              postContent: {
                 type: Seuqelize.TEXT,
                 allowNull: false,
              },
              postImg: {
                 type: Sequelize.STRING(255),
                 allowNull: true,
              },
              price: {
                  type: Seuqelize.INTEGER,
                  allowNull: true,
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
              collate: 'utf8mb4_general_ci',
           },
        )
    }
    static associate(db) {
        db.Post
    }
}