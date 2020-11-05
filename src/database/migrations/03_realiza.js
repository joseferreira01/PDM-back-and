exports.up = function(knex) {
    return knex.schema.createTable('realiza', function (table) {
        table.string('doacao_id').primary();
        table.string('usuario_email').primary();
        table.string('data').notNullable();
        table.foreign('usuario_email').references('usuario.email');
        table.foreign('doacao_id').references('doacao.id');
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('realiza');
  };