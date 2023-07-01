import { EC2, DescribeRegionsCommand, Region } from '@aws-sdk/client-ec2';

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
