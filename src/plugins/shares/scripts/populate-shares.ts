import fs from 'fs';
import path from 'path';
import { bootstrapWorker, Logger } from '@vendure/core';
import { config } from '../../../vendure-config';
import { parse } from 'csv-parse/sync';
import { SharesService } from '../shares.service';

const loggerCtx = 'Populate Shares';

runBootstrap()
  .then(() => {
    Logger.info('Exiting with code 0...', loggerCtx);
    process.exit(0);
  })
  .catch(() => process.exit(1));

async function runBootstrap() {
  const { app } = await bootstrapWorker(config);

  Logger.info('Reading csv file', loggerCtx);
  const csv = fs.readFileSync(path.join(__dirname, './shares.csv')).toString();

  Logger.info('Parsing csv file', loggerCtx);
  const records = parse(csv, { columns: true });

  //console.log(records);

  const sharesService = app.get(SharesService);

  Logger.info('Inserting into DB...', loggerCtx);
  try {
    await sharesService.insertShare(records);
  } catch (e) {
    Logger.error(e.message, loggerCtx, e.stack);
  }
}
