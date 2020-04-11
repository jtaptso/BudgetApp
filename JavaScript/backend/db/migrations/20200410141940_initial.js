const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

function addDefaultColumns(table){
    table.timestamps(false, true);
    table.datetime('deleted_at');
}
function createNameTable(knex, table_name){
    return knex.schema.createTable(table_name, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table);
    });
}
function references(table, tableName){
    table
        .integer(`${tableName}_id`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');
}
function url(table, columName){
    table.string(columName, 2000);
}

/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
    await Promise.all([
        knex.schema.createTable(tableNames.user, (table) => {
            table.increments().notNullable();
            table.string('email', 254).notNullable().unique();
            table.string('name').notNullable();
            table.string('password', 127).notNullable();
            table.datetime('last_login');
            addDefaultColumns(table);
        }),
        createNameTable(knex, tableNames.item_type),
        createNameTable(knex, tableNames.state),
        createNameTable(knex, tableNames.country),
        createNameTable(knex, tableNames.project_type),
        knex.schema.createTable(tableNames.currency, (table) => {
            table.increments().notNullable();
            table.string('name').notNullable().unique();
            url(table, 'symbol_url');
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.location, (table) => {
            table.increments().notNullable();
            table.string('name').notNullable().unique();
            table.string('description', 1000);
            url(table, 'image_url');
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.report, (table) => {
            table.increments().notNullable();
            table.datetime('date').notNullable().unique();
            table.string('description', 1000);
            url(table, 'file_url');
            table.float('totalAssetExpected');
            table.float('totalAssetActual');
            table.float('totalLibilityExpected');
            table.float('totalLibilityActual');
            addDefaultColumns(table);
        }),
    ]);

    
  await knex.schema.createTable(tableNames.project, (table) => {
      table.increments().notNullable();
      references(table, tableNames.user);
      references(table, tableNames.project_type);
      addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.itemGroup, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    references(table, tableNames.project);
    table.float('expectedAmount').notNullable();
    table.float('realAmount').notNullable();
    table.float('percentage');
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.item, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    references(table, tableNames.itemGroup);
    references(table, tableNames.item_type);
    table.float('expected').notNullable();
    table.float('actual').notNullable();
    url(table, 'image_url');
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.project_report, (table) => {
    table.increments().notNullable();
    references(table, tableNames.project);
    references(table, tableNames.report);
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
    await Promise.all([
        tableNames.project_report,
        tableNames.item,
        tableNames.itemGroup,
        tableNames.project, 
        tableNames.user,
        tableNames.item_type,
        tableNames.state,
        tableNames.country,
        tableNames.currency,
        tableNames.location,
        tableNames.project_type,
        tableNames.report,
    ].map(tablename => knex.schema.dropTable(tablename)));
};
