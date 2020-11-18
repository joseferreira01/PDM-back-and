
exports.up = function(knex) {
    return knex.schema.createTable('doacao', function (table) {
        table.increments()
        table.decimal('valor');
        table.string('id_ong').notNullable();
        table.foreign('id_ong').references('ong.id')
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('doacao');
  };