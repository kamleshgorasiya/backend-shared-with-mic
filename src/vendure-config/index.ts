//import { prodConfig } from './prod.config';
import { devConfig } from './dev.config';

// Typescript global scope declaration merging for process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
    }
  }
}

// Dependency on ENV VARIABLE: NODE_ENV
//export const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export const config = devConfig;
