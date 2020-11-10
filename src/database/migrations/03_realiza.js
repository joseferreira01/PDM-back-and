exports.up = function(knex) {
    return knex.schema.createTable('realiza', function (table) {
        table.string('doacao_id').primary();
        table.string('usuario_id').primary();
        table.string('data').notNullable();
        table.foreign('usuario_id').references('usuario.id');
        table.foreign('doacao_id').references('doacao.id');
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('realiza');
  };