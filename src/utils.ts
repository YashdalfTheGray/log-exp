import { faker } from '@faker-js/faker';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

export enum TestStatus {
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

export enum Architecture {
  Arm = 'aarch64',
  X86 = 'x86_64',
}

const statusThings = [
  { weight: 9, value: TestStatus.Success },
  { weight: 1, value: TestStatus.Failure },
];

const platformThings = [Architecture.Arm, Architecture.X86];

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
    status: status.toString(),
    startedTime: Date.now() - FIVE_MINUTES_IN_MS,
    endedTime: Date.now(),
    platform: faker.helpers.arrayElement(platformThings),
    error: status === TestStatus.Failure ? 'something went wrong' : null,
  };
}

export function convertStatusToNumber(status: string) {
  switch (status) {
    case TestStatus.Success:
      return 1;
    case TestStatus.Failure:
      return 0;
    default:
      return -1;
  }
}
