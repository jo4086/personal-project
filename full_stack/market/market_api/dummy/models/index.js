// /market/market_api/models/index.js
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]

const User = require('./user')
const Address = require('./address')
const Post = require('./post')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.User = User
db.Post = Post
db.Address = Address

User.init(sequelize)
Post.init(sequelize)
Address.init(sequelize)

User.associate(db)
Post.associate(db)
Address.associate(db)

module.exports = db
