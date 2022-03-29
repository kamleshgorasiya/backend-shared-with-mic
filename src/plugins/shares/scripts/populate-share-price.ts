import fs from 'fs';
import path from 'path';
import { bootstrapWorker, Logger } from '@vendure/core';
import { config } from '../../../vendure-config';
import { parse } from 'csv-parse/sync';
import { SharesService } from '../shares.service';

const loggerCtx = 'Populate Share-Price';

runBootstrap()
  .then(() => {
    Logger.info('Exiting with code 0...', loggerCtx);
    process.exit(0);
  })
  .catch(() => process.exit(1));

async function runBootstrap() {
  const { app } = await bootstrapWorker(config);

  Logger.info('Reading csv file', loggerCtx);
  const csv = fs.readFileSync(path.join(__dirname, './share-price.csv')).toString();

  Logger.info('Parsing csv file', loggerCtx);
  const records = parse(csv, { columns: true, skipEmptyLines: true });

  const sharePriceService = app.get(SharesService);

  Logger.info('Inserting into DB...', loggerCtx);
  try {
    await sharePriceService.insertSharePrice(records);
  } catch (e) {
    Logger.error(e.message, loggerCtx, e.stack);
  }
}
