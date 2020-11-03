
exports.up = function(knex) {
    return knex.schema.createTable('message',function(table){
       table.increments();
         table.string('name').notNullable();
         table.string('email').notNullable();
         table.string('whatsapp');
         table.string('status').notNullable();
         table.string('date').notNullable();
       
        
       
     });
   };
   
   exports.down = function(knex) {
     knex.schema.dropTable('message');
   };
   