
exports.up = function(knex) {
 return knex.schema.createTable('usuario',function(table){
  table.increments();
  table.string('nome').notNullable();
  table.string('email').unique();
  table.string('telefone').notNullable();
  table.string('senha').notNullable()
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('usuario');
};
