import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Database } from 'arangojs';

@Injectable()
/**
 * Service to interact with the ArangoDB database.
 */
export class DatabaseService {
    /**
     * The database connection instance.
     */
    private conn: Database;

    /**
     * Creates an instance of DatabaseService.
     * @param conn - The ArangoDB connection instance injected by the 'ArangoProvider'.
     */
    constructor(@Inject('ArangoProvider') conn: Database) {
        this.conn = conn;
    }

    /**
     * Retrieves all documents from a specified collection.
     * @param collection - The name of the collection to query.
     * @returns A promise that resolves to an array of documents.
     */
    async getAll(collection: string) {
        try {
            const cursor = await this.conn.query(`FOR doc IN ${collection} RETURN doc`);
            return cursor.all();
        } catch (error) {
            throw new HttpException(`Failed to retrieve documents: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    /**
     * Retrieves a single document from a specified collection by its key.
     * @param collection - The name of the collection to query.
     * @param key - The key of the document to retrieve.
     * @returns A promise that resolves to the document.
     */
    async getOne(collection: string, key: string) {
        try {
            const document = await this.conn.collection(collection).document(key);
            return document;
        } catch (error) {
            throw new HttpException(`Failed to retrieve document: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    /**
     * Inserts a new document into a specified collection.
     * @param collection - The name of the collection to insert into.
     * @param data - The data of the document to insert.
     * @returns A promise that resolves to the result of the insert operation.
     */
    async insert(collection: string, data: any) {
        try {
            const result = await this.conn.collection(collection).save(data);
            return result;
        } catch (error) {
            throw new HttpException(`Failed to insert document: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    /**
     * Updates an existing document in a specified collection.
     * @param collection - The name of the collection to update.
     * @param key - The key of the document to update.
     * @param data - The new data for the document.
     * @returns A promise that resolves to the result of the update operation.
     */
    async update(collection: string, key: string, data: any) {
        try {
            const result = await this.conn.collection(collection).update(key, data);
            return result;
        } catch (error) {
            throw new HttpException(`Failed to update document: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    /**
     * Deletes a document from a specified collection by its key.
     * @param collection - The name of the collection to delete from.
     * @param key - The key of the document to delete.
     * @returns A promise that resolves to the result of the delete operation.
     */
    async delete(collection: string, key: string) {
        try {
            const result = await this.conn.collection(collection).remove(key);
            return result;
        } catch (error) {
            throw new HttpException(`Failed to delete document: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    /**
     * Executes an AQL query with optional bind variables.
     * @param query - The AQL query string to execute.
     * @param bindVars - Optional bind variables for the query.
     * @returns A promise that resolves to an array of documents resulting from the query.
     */
    async executeAQL(query: string, bindVars?: any) {
        try {
            const cursor = await this.conn.query(query, bindVars);
            return cursor.all();
        } catch (error) {
            throw new HttpException(`Failed to execute AQL query: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    /**
     * Removes an object from a sub-array in a specified document.
     * @param collection - The name of the collection.
     * @param key - The key of the document.
     * @param sub - The sub-array field name.
     * @param data - The data to remove from the sub-array.
     * @returns A promise that resolves to the updated document.
     */
    async removeObject(collection: string, key: string, sub: string, index: string) {
        try {
            const cursor = await this.conn.query(`
                LET doc = DOCUMENT(${collection}, @key)
                LET updatedSubArray = SLICE(doc.${sub}, 0, @index) + SLICE(doc.${sub}, @index + 1)
                UPDATE doc WITH {
                    ${sub}: updatedSubArray
                } IN ${collection} RETURN NEW
            `, { key, index });
            return cursor.next();
        } catch (error) {
            throw new HttpException(`Failed to remove object: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    /**
     * Appends an object to a sub-array in a specified document.
     * @param collection - The name of the collection.
     * @param key - The key of the document.
     * @param sub - The sub-array field name.
     * @param data - The data to append to the sub-array.
     * @returns A promise that resolves to the updated document.
     */
    async appendObject(collection: string, key: string, sub: string, data: any) {
        try {
            const cursor = await this.conn.query(`
                LET doc = DOCUMENT(${collection}, @key)
                UPDATE doc WITH {
                    ${sub}: APPEND(doc.${sub}, @data)
                } IN ${collection} RETURN NEW
            `, { key, data });
            return cursor.next();
        } catch (error) {
            throw new HttpException(`Failed to append object: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }
    /**
     * Retrieves all objects from a sub-array in a specified document.
     * @param collection - The name of the collection.
     * @param key - The key of the document.
     * @param sub - The sub-array field name.
     * @returns A promise that resolves to the sub-array of objects.
     */
    async getAllObject(collection: string, key: string, sub: string) {
        try {
            const cursor = await this.conn.query(`
            LET doc = DOCUMENT(${collection}, @key)
            RETURN doc.${sub}
            `, { key });
            const result = await cursor.next();
            return result || [];
        } catch (error) {
            throw new HttpException(`Failed to retrieve objects: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }
    /**
     * Retrieves an object from a sub-array in a specified document by its index.
     * @param collection - The name of the collection.
     * @param key - The key of the document.
     * @param sub - The sub-array field name.
     * @param index - The index of the object in the sub-array.
     * @returns A promise that resolves to the object at the specified index.
     */
    async getOneByIndexArray(collection: string, key: string, sub: string, index: number) {
        try {
            const cursor = await this.conn.query(`
                LET doc = DOCUMENT(${collection}, @key)
                RETURN doc.${sub}[${index}]
            `, { key });
            return cursor.next() || [];
        } catch (error) {
            throw new HttpException(`Failed to retrieve object by index: ${error.message}`, HttpStatus.BAD_GATEWAY);
        }
    }
}
