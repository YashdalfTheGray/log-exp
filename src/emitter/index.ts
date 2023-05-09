import * as dotenv from 'dotenv';
dotenv.config();

import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs';
import { CloudWatch } from '@aws-sdk/client-cloudwatch';

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  AWS_REGION,
  AWS_LOGGROUP_NAME,
  EMIT_INTERVAL_IN_MINUTES,
} = process.env;

checkVars(
  { name: 'AWS_ACCESS_KEY_ID', value: AWS_ACCESS_KEY_ID },
  { name: 'AWS_SECRET_ACCESS_KEY', value: AWS_SECRET_ACCESS_KEY },
  { name: 'AWS_REGION', value: AWS_REGION },
  { name: 'AWS_LOGGROUP_NAME', value: AWS_LOGGROUP_NAME }
);

const emitIntervalInMinutes =
  parseInt(EMIT_INTERVAL_IN_MINUTES!, 10) || 10 * 60 * 1000;

const commonConfig = {
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
    sessionToken: AWS_SESSION_TOKEN,
  },
};

const cwlClient = new CloudWatchLogs(commonConfig);
const cwmClient = new CloudWatch(commonConfig);

function checkVars(
  ...varsToCheck: { name: string; value: string | undefined }[]
) {
  const undefinedVars = varsToCheck
    .map((n, v) => {
      if (!v) {
        console.error('Environment variable %s not defined', n);
        return false;
      }
      return true;
    })
    .filter((v) => !v).length;

  if (undefinedVars > 0) {
    process.exit(1);
  }
}
