import path from 'path';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { BullMQJobQueuePlugin } from '@vendure/job-queue-plugin/package/bullmq';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import {
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  LanguageCode,
  VendureConfig,
} from '@vendure/core';
import { SharesPlugin } from '../plugins/shares/plugin';

import { Shares } from '../plugins/shares/shares.entity';

import { customAdminUi, ShareUIPlugin } from '../plugins/ui-mapping-plugin'


//-----------------------------------------------------------------------------
export const devConfig: VendureConfig = {
  apiOptions: {
    port: 3001,
    adminApiPath: 'admin-api',
    adminApiPlayground: {
      settings: {
        'request.credentials': 'include',
      } as any,
    }, // turn this off for production
    adminApiDebug: true, // turn this off for production
    shopApiPath: 'shop-api',
    shopApiPlayground: {
      settings: {
        'request.credentials': 'include',
      } as any,
    }, // turn this off for production
    shopApiDebug: true, // turn this off for production
  },
  authOptions: {
    superadminCredentials: {
      identifier: 'superadmin',
      password: 'superadmin',
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET || 'cookie-secret',
    },
    requireVerification: true,
  },
  dbConnectionOptions: {
    type: 'postgres',
    synchronize: true, // turn this off for production
    logging: false,
    database: 'trylah_dev',
    host: 'localhost',
    port: 5432,
    username: 'kamlesh',
    password: '88664422',
    migrations: [path.join(__dirname, '../migrations/*.ts')],
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {
    Customer: [
      {
        name: 'myStockId',
        type: 'int',
        nullable: true,
        label: [{ languageCode: LanguageCode.en, value: 'My Stock' }],
      },
      { name: 'phoneVerified', type: 'boolean', nullable: false, defaultValue: false },
    ],
    ProductVariant: [{ name: 'originalPrice', type: 'float', nullable: true, defaultValue: 0, label: [{ languageCode: LanguageCode.en, value: 'Original price' }] }],

    Product: [
      {
        name: 'totalShareAmount', type: 'float', defaultValue: 0, label: [{ languageCode: LanguageCode.en, value: 'Total share benefit', }],
      },
      {
        name: 'brandstock', type: 'relation', entity: Shares, graphQLType: 'Share', eager: true, label: [{ languageCode: LanguageCode.en, value: 'Select brand stock' }],
        ui: { component: 'dropdown-form-input' }
      },
      {
        name: 'brandStockPercentage', type: 'float', defaultValue: 0, label: [{ languageCode: LanguageCode.en, value: 'Brand-share percentage', }],
      },
      {
        name: 'myStockPercentage', type: 'float', defaultValue: 0, label: [{ languageCode: LanguageCode.en, value: 'My-share percentage', }],
      },
    ],
  },
  plugins: [
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../../static/assets'),
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    // BullMQJobQueuePlugin.init({
    //   connection: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, '../../static/email/test-emails'),
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, '../../static/email/templates'),
      
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation
        fromAddress: '"TryLah" <dan@trylah.sg>',
        verifyEmailAddressUrl: 'http://localhost:4000/auth/sign-up/email-verify',
        passwordResetUrl: 'http://localhost:4000/auth/reset-password',
        changeEmailAddressUrl: 'http://localhost:4000/dashboard/profile/email/verify',
      },
    }),
  
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      app: customAdminUi({ recompile: !false, devMode: true }),
    }),
    SharesPlugin
  ],
};
