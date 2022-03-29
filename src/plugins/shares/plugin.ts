import fs from 'fs';
import path from 'path';
import { gql } from 'apollo-server-core';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { SharePrice } from './share-price.entity';
import { SharesResolver } from './shares.resolver';
import { Shares } from './shares.entity';
import { SharesService } from './shares.service';

const schemaExtension = gql`
  ${fs.readFileSync(path.join(__dirname, './schema-extension.gql')).toString()}
`;
@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [Shares, SharePrice],
  providers: [SharesService],
  adminApiExtensions: {
    schema: schemaExtension,
    resolvers: [SharesResolver],
  },
  shopApiExtensions: {
    schema: schemaExtension,
    resolvers: [SharesResolver],
  },
})
export class SharesPlugin {}
