import * as dotenv from 'dotenv';
dotenv.config();

import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs';
import { CloudWatch } from '@aws-sdk/client-cloudwatch';
import { EC2, DescribeRegionsCommand, Region } from '@aws-sdk/client-ec2';

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

function checkVars(
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

function generateRandomJson() {}

async function getAllAvailableRegions(client: EC2) {
  try {
    const command = new DescribeRegionsCommand({ AllRegions: false });
    const { Regions: regions } = await client.send(command);
    return regions!.map((r) => r.RegionName);
  } catch (e) {
    console.error('Something went wrong', e);
    return [] as Region[];
  }
}

(async () => {
  const cwlClient = new CloudWatchLogs(commonConfig);
  const cwmClient = new CloudWatch(commonConfig);
  const ec2Client = new EC2(commonConfig);

  const allRegions = await getAllAvailableRegions(ec2Client);
  console.log(allRegions);
})();
