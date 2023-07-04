import * as dotenv from 'dotenv';
dotenv.config();

import { checkVars, generateRandomJsonPayload } from './utils';
import { getEc2Client, getAllAvailableRegions } from './aws';
import { initTestNames } from './init';

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_LOGGROUP_NAME,
  AWS_LOGGROUP_REGION,
  AWS_CUSTOM_METRIC_NAME,
  AWS_CUSTOM_METRIC_REGION,
  EMIT_INTERVAL_IN_SECONDS,
  SHADOW,
} = process.env;

const emitIntervalInMs =
  (parseInt(EMIT_INTERVAL_IN_SECONDS!, 10) || 10 * 60) * 1000;

const testNames = initTestNames();

if (SHADOW === 'true') {
  console.log('Running in shadow mode, just printing out random payloads');
  const interval = setInterval(() => {
    console.log(JSON.stringify(generateRandomJsonPayload(testNames), null, 2));
  }, emitIntervalInMs);

  setTimeout(() => {
    clearInterval(interval);
    console.log('Finished out printing stuff, existing with 0');
    process.exit(0);
  }, emitIntervalInMs * 6);
} else {
  checkVars(
    { name: 'AWS_ACCESS_KEY_ID', value: AWS_ACCESS_KEY_ID },
    { name: 'AWS_SECRET_ACCESS_KEY', value: AWS_SECRET_ACCESS_KEY },
    { name: 'AWS_REGION', value: AWS_REGION },
    { name: 'AWS_LOGGROUP_NAME', value: AWS_LOGGROUP_NAME },
    { name: 'AWS_LOGGROUP_REGION', value: AWS_LOGGROUP_REGION },
    { name: 'AWS_CUSTOM_METRIC_NAME', value: AWS_CUSTOM_METRIC_NAME },
    { name: 'AWS_CUSTOM_METRIC_REGION', value: AWS_CUSTOM_METRIC_REGION }
  );

  (async () => {
    const ec2Client = getEc2Client();
    const allRegions = await getAllAvailableRegions(ec2Client);
    console.log(allRegions);
  })();
}
