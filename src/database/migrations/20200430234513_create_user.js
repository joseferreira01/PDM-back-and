
exports.up = function(knex) {
 return knex.schema.createTable('user',function(table){
  table.string('name').notNullable();
  table.string('email').primary();
  table.string('telefone').notNullable();
  table.string('senha').notNullable()
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('user');
};
