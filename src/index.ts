import * as dotenv from 'dotenv';
dotenv.config();

import { checkVars } from './utils';
import { getEc2Client, getAllAvailableRegions } from './aws';

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  AWS_REGION,
  AWS_LOGGROUP_NAME,
  AWS_LOGGROUP_REGION,
  AWS_CUSTOM_METRIC_NAME,
  AWS_CUSTOM_METRIC_REGION,
  EMIT_INTERVAL_IN_MINUTES,
  SHADOW,
} = process.env;

if (SHADOW == 'true') {
  process.exit(0);
}

checkVars(
  { name: 'AWS_ACCESS_KEY_ID', value: AWS_ACCESS_KEY_ID },
  { name: 'AWS_SECRET_ACCESS_KEY', value: AWS_SECRET_ACCESS_KEY },
  { name: 'AWS_REGION', value: AWS_REGION },
  { name: 'AWS_LOGGROUP_NAME', value: AWS_LOGGROUP_NAME },
  { name: 'AWS_LOGGROUP_REGION', value: AWS_LOGGROUP_REGION },
  { name: 'AWS_CUSTOM_METRIC_NAME', value: AWS_CUSTOM_METRIC_NAME },
  { name: 'AWS_CUSTOM_METRIC_REGION', value: AWS_CUSTOM_METRIC_REGION }
);

const emitIntervalInMinutes =
  parseInt(EMIT_INTERVAL_IN_MINUTES!, 10) || 10 * 60 * 1000;

(async () => {
  const ec2Client = getEc2Client();
  const allRegions = await getAllAvailableRegions(ec2Client);
  console.log(allRegions);
})();
