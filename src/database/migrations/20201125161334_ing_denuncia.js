
exports.up = function(knex) {
    return knex.schema.createTable('imagens',function(table){
     table.increments();
     table.string('path').notNullable();
   
     });
   };
   
   exports.down = function(knex) {
     knex.schema.dropTable('imagens');
   };
   