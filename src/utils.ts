import { faker } from '@faker-js/faker';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const ARM = 'aarch64';
const X86 = 'x86_64';

const statusThings = [
  { weight: 9, value: SUCCESS },
  { weight: 1, value: FAILURE },
];

const platformThings = [ARM, X86];

export function checkVars(
  ...varsToCheck: { name: string; value: string | undefined }[]
) {
  const undefinedVars = varsToCheck
    .map(({ name, value }) => {
      if (!value) {
        console.error('Environment variable %s not defined', name);
        return false;
      }
      return true;
    })
    .filter((v) => !v).length;

  if (undefinedVars > 0) {
    process.exit(1);
  }
}

export function generateRandomJsonPayload(testNames: string[]) {
  const status = faker.helpers.weightedArrayElement(statusThings);
  return {
    name: faker.helpers.arrayElement(testNames),
    status,
    startedTime: Date.now() - FIVE_MINUTES_IN_MS,
    endedTime: Date.now(),
    platform: faker.helpers.arrayElement(platformThings),
    error: status === FAILURE ? 'something went wrong' : null,
  };
}
