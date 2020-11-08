
exports.up = function(knex) {
    return knex.schema.createTable('doacao', function (table) {
        table.increments()
        table.decimal('valor');
        table.string('email_ong').notNullable();
        table.foreign('email_ong').references('ong.email')
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('doacao');
  };