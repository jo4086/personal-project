const Sequelize = require('sequelize')

module.exports = class Address extends Sequelize.Model {
     static init(sequelize) {
            return super.init(
                {
                    address: {
                        type: Sequelize.STRING(255),
                        allowNull: true,
                        unique: true,
                    }
                },
                {
                    sequelize,
                    timestamps: true,
                    underscored: false,
                    modelname: 'Address',
                    tablename: 'addresses',
                    paranoid: true,
                    charset: 'utf8mb4',
                    collate: 'utf8mb4_general_ci',
                },
            )
        }
        static associate(db) {
            db.Address.belongsTo(db.User, {
                foreignKey: 'userId',
                sourceKey: 'id',
            })
        }
    
}