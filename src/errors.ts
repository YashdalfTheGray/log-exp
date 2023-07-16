import { PutLogEventsCommandOutput } from '@aws-sdk/client-cloudwatch-logs';

export class LogEventIngestionError extends Error {
  constructor(
    rejectedLogEventsInfo: PutLogEventsCommandOutput['rejectedLogEventsInfo']
  ) {
    const message = `Got log rejection errors - ${JSON.stringify(
      rejectedLogEventsInfo
    )}`;
    super(message);
    this.name = 'LogEventIngestionError';
  }
}
