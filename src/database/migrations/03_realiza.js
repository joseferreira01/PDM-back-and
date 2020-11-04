exports.up = function(knex) {
    return knex.schema.createTable('realiza', function (table) {
        table.string('doacao_id').primary();
        table.string('usuario_email').primary();
       
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('realiza');
  };