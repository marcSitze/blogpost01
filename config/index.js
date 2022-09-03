if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// console.log('env: ', process.env)
const config = {
  app: {
    name: process.env.APP_NAME || "blogpost",
    port: process.env.PORT || 8000,
    dbName: process.env.DB_NAME || 'blogpost',
    dbPort: process.env.DB_PORT || 27017,
    dbURL: process.env.DB_URL || 'mongodb://localhost:27017/blogpost'
  },
  auth:{
    jwtSecret: process.env.JWT_SECRET || "my-ultra-secret-jwt"
  }
}

module.exports = config;