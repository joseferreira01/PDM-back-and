exports.up = function(knex) {
    return knex.schema.createTable('ong', function (table) {
        table.string('name').notNullable();
        table.string('email').primary();
        table.string('senha').notNullable();
        table.string('telefone').notNullable();
        table.string('descricao');
        table.string('uf').notNullable();
        table.string('bairo').notNullable();
        table.string('rua').notNullable();
        table.string('cidade').notNullable();
        table.integer('numero').notNullable()
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('ong');
  };