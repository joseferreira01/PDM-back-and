exports.up = function(knex) {
    return knex.schema.createTable('ong', function (table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
        table.string('telefone').notNullable();
        table.string('descricao');
        table.string('uf').notNullable();
        table.string('bairro').notNullable();
        table.string('rua').notNullable();
        table.string('cidade').notNullable();
        table.integer('numero').notNullable();
        table.string('caixa_postal');
        table.string('cep');
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('ong');
  };