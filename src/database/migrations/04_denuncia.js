exports.up = function(knex) {
    return knex.schema.createTable('denuncia', function (table) {
        table.increments('id').primary();
        table.string('tipo_crime').notNullable();
        table.string('descricao').notNullable();
        table.string('titulo').notNullable();
        table.string('status').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('uf').notNullable();
        table.string('bairro').notNullable();
        table.string('rua').notNullable();
        table.string('foto').notNullable();
        table.string('data').notNullable();
        table.string('cidade').notNullable();
        table.integer('numero').notNullable();
        table.integer('usuario_id').notNullable();
        table.integer('ong_id');
        table.foreign('usuario_id').references('usuario.id');
        table.foreign('ong_id').references('ong.id')
    })
  };
  
  exports.down = function(knex) {
     return knex.schema.dropTable('denuncia');
  };