import { CloudWatch, CloudWatchClientConfig } from '@aws-sdk/client-cloudwatch';
import {
  CloudWatchLogs,
  CloudWatchLogsClientConfig,
} from '@aws-sdk/client-cloudwatch-logs';
import {
  EC2,
  DescribeRegionsCommand,
  Region,
  EC2ClientConfig,
} from '@aws-sdk/client-ec2';

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  AWS_REGION,
} = process.env;

export const commonConfig = {
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
    sessionToken: AWS_SESSION_TOKEN,
  },
};

export function getCloudwatchLogsClient(region = AWS_REGION) {
  return new CloudWatchLogs(
    Object.assign({}, commonConfig, {
      region,
    } as CloudWatchLogsClientConfig)
  );
}

export function getCloudwatchMetricsClient(region = AWS_REGION) {
  return new CloudWatch(
    Object.assign({}, commonConfig, {
      region,
    } as CloudWatchClientConfig)
  );
}

export function getEc2Client(config = commonConfig as EC2ClientConfig) {
  return new EC2(config);
}

export async function getAllAvailableRegions(client: EC2) {
  try {
    const command = new DescribeRegionsCommand({ AllRegions: false });
    const { Regions: regions } = await client.send(command);
    return regions!.map((r) => r.RegionName);
  } catch (e) {
    console.error('Something went wrong', e);
    return [] as Region[];
  }
}
