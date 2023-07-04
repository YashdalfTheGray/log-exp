import { readFileSync, writeFileSync } from 'node:fs';

import { faker } from '@faker-js/faker';

export function initTestNames() {
  try {
    const content = readFileSync('state.json', { encoding: 'utf8' });
    return JSON.parse(content);
  } catch (e) {
    const genTestNames = faker.helpers.uniqueArray(
      () => faker.lorem.slug({ min: 3, max: 6 }),
      20
    );

    writeFileSync('state.json', JSON.stringify(genTestNames, null, 2), {
      encoding: 'utf8',
      flag: 'w',
    });

    return genTestNames;
  }
}
