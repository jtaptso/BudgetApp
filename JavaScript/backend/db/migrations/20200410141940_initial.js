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
        knex.schema.createTable(tableNames.currency, (table) => {
            table.increments().notNullable();
            table.string('name').notNullable().unique();
            table.string('image_url', 2000);
            addDefaultColumns(table);
        }),
        knex.schema.createTable(tableNames.location, (table) => {
            table.increments().notNullable();
            table.string('name').notNullable().unique();
            table.string('description', 1000);
            table.string('image_url', 2000);
            addDefaultColumns(table);
        })
    ]);
};

exports.down = async (knex) => {
    await Promise.all([
        tableNames.user,
        tableNames.item_type,
        tableNames.state,
        tableNames.country,
        tableNames.currency,
        tableNames.location
    ].map(tablename => knex.schema.dropTable(tablename)));
};
