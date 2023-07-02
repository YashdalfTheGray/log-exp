import { faker } from '@faker-js/faker';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const testNames = faker.helpers.uniqueArray(
  () => faker.lorem.slug({ min: 3, max: 6 }),
  20
);

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

export function generateRandomJsonPayload() {
  const status = '';
  return {
    name: faker.helpers.arrayElement(testNames),
    status,
    startedTime: Date.now() - FIVE_MINUTES_IN_MS,
    endedTime: Date.now(),
    platform: '',
    error: status ? 'something went wrong' : null,
  };
}
