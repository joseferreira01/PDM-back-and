exports.up = function(knex) {
    return knex.schema.createTable('denuncia', function (table) {
        table.string('id').primary();
        table.string('tipo_crime').notNullable();
        table.string('descricao').notNullable();
        table.string('nome_denuncio').notNullable();
        table.string('localizao').notNullable();
        table.string('uf').notNullable();
        table.string('bairo').notNullable();
        table.string('rua').notNullable();
        table.string('cidade').notNullable();
        table.string('numero').notNullable();
        table.string('usuario_email').notNullable();
        table.string('ong_email').notNullable();
        table.foreign('usuario_email').references('usuario.email');
        table.foreign('ong_email').references('ong.email')
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('denuncia');
  };