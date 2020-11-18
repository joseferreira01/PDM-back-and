exports.up = function(knex) {
    return knex.schema.createTable('denuncia', function (table) {
        table.increments('id').primary();
        table.string('tipo_crime').notNullable();
        table.string('descricao').notNullable();
        table.string('nome_denuncio').notNullable();
        table.string('localizao').notNullable();
        table.string('uf').notNullable();
        table.string('bairo').notNullable();
        table.string('rua').notNullable();
        table.string('cidade').notNullable();
        table.string('numero').notNullable();
        table.string('usuario_id').notNullable();
        table.string('ong_id').notNullable();
        table.foreign('usuario_id').references('usuario.id');
        table.foreign('ong_id').references('ong.id')
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('denuncia');
  };