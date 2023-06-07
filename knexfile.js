// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || "127.0.0.1",
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || "cc_shopping_apps",
            user: process.env.DB_USERNAME || "user",
            password: process.env.DB_PASSWORD || "user",
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },

    staging: {
        connection: {
            host: process.env.DB_HOST || "127.0.0.1",
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || "cc_shopping_apps",
            user: process.env.DB_USERNAME || "user",
            password: process.env.DB_PASSWORD || "user",
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
        pool: {
            min: 2,
            max: 10
        },
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL || {
            user: process.env.DB_USERNAME || "user",
            host: process.env.DB_HOST || "127.0.0.1",
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || "cc_shopping_apps",
            password: process.env.DB_PASSWORD || "user",
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    }

};