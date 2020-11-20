
exports.up = function(knex) {
 return knex.schema.createTable('usuario',function(table){
<<<<<<< HEAD
  table.increments();
  table.string('nome').notNullable();
  table.string('email').unique();
=======
  table.increments('id').primary();
  table.string('nome').notNullable();
  table.string('email').notNullable();
>>>>>>> 5b7fe3c3953809d66aa8575d6567ea84ba9cc763
  table.string('telefone').notNullable();
  table.string('senha').notNullable()
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('usuario');
};
