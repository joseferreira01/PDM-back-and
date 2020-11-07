const knex = require('knex');
const configuration = require('../../knexfile');
const path = require('path')
const conection = knex(configuration.development);

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true,
})

module.exports = conection;