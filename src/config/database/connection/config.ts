import { Database } from "arangojs";

/**
 * Provides a configured instance of the ArangoDB database connection.
 * 
 * @constant
 * @type {{ provide: string, useFactory: Function }}
 */
export const ArangoProvider = {
    provide: 'ArangoProvider',

    /**
     * Factory function that creates and returns a new instance of the ArangoDB database connection.
     * 
     * The function retrieves the following configuration values from environment variables:
     * - `ARANGO_HOST`: The hostname of the ArangoDB server (default: 'localhost').
     * - `ARANGO_PORT`: The port number of the ArangoDB server (default: '8529').
     * - `ARANGO_DB`: The name of the ArangoDB database (default: 'default').
     * - `ARANGO_USER`: The username for authentication (default: 'root').
     * - `ARANGO_PASSWORD`: The password for authentication (default: 'password').
     * 
     * @returns {Database} A new instance of the ArangoDB database connection.
     */
    useFactory: () => {
        const host = process.env.ARANGODB_HOST || '127.0.0.1';
        const port = process.env.ARANGODB_PORT || '8529';
        const database = process.env.ARANGODB_DB || 'default';
        const user = process.env.ARANGODB_USER || 'root';
        const password = process.env.ARANGODB_PASSWORD || 'password';

        return new Database({
            url: `http://${host}:${port}`,
            databaseName: database,
            auth: { username: user, password }
        });
    }
};
