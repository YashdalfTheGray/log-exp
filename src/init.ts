import { readFileSync, writeFileSync } from 'node:fs';

import { faker } from '@faker-js/faker';

export function initTestNames(stateFilePath: string) {
  try {
    const content = readFileSync(stateFilePath, { encoding: 'utf8' });
    return JSON.parse(content);
  } catch (e) {
    const genTestNames = faker.helpers.uniqueArray(
      () => faker.lorem.slug({ min: 3, max: 6 }),
      20
    );

    writeFileSync(stateFilePath, JSON.stringify(genTestNames, null, 2), {
      encoding: 'utf8',
      flag: 'w',
    });

    return genTestNames;
  }
}
