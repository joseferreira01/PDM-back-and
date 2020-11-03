
exports.up = function(knex) {
 return knex.schema.createTable('user',function(table){
    table.increments();
      table.string('login').unique();
      table.string('password');   
    
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('user');
};
