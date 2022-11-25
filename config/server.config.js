if(process.env.NODE_ENV != 'Production'){
    require('dotenv').config();
}

module.exports = {PORT : process.env.PORT}