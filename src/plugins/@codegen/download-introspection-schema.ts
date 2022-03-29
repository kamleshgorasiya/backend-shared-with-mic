import fs from 'fs';
import http from 'http';
import path from 'path';
import { getIntrospectionQuery } from 'graphql';

// tslint:disable:no-console

const ADMIN_API_PATH = 'admin-api';
const SHOP_API_PATH = 'shop-api';
const ADMIN_SCHEMA_OUTPUT_FILE = path.join(__dirname, './schema-admin.json');
const SHOP_SCHEMA_OUTPUT_FILE = path.join(__dirname, './schema-shop.json');

// tslint:disable:no-console

Promise.all([
  downloadIntrospectionSchema(ADMIN_API_PATH, ADMIN_SCHEMA_OUTPUT_FILE),
  downloadIntrospectionSchema(SHOP_API_PATH, SHOP_SCHEMA_OUTPUT_FILE),
]).then(
  () => {
    process.exit(0);
  },
  err => {
    console.error(err);
    process.exit(1);
  }
);
/**
 * Makes an introspection query to the Vendure server and writes the result to a
 * schema.json file.
 *
 * If there is an error connecting to the server, the promise resolves to false.
 */
export function downloadIntrospectionSchema(
  apiPath: string,
  outputFilePath: string
): Promise<boolean> {
  const body = JSON.stringify({ query: getIntrospectionQuery() });

  return new Promise((resolve, reject) => {
    const request = http.request(
      {
        method: 'post',
        host: 'localhost',
        port: 3000,
        path: '/' + apiPath,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      response => {
        const outputFile = fs.createWriteStream(outputFilePath);
        response.pipe(outputFile);
        response.on('end', () => resolve(true));
        response.on('error', reject);
      }
    );
    request.write(body);
    request.end();
    request.on('error', (err: any) => {
      if (err.code === 'ECONNREFUSED') {
        console.error(`ERROR: Could not connect to the Vendure server`);
        resolve(false);
      }
      reject(err);
    });
  });
}
