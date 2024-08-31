import { readFileSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

const configFileNameMapping = {
  development: 'dev',
  production: 'prod',
};

const env = process.env.NODE_ENV;

export default () => {
  return load(
    readFileSync(
      join(__dirname, `../../src/config/${configFileNameMapping[env]}.yml`),
      'utf8',
    ),
  ) as Record<string, any>;
};
