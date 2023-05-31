# log-exp

Experimenting with logging and cross regional cloudwatch access

## Setup

You'll need Node.js, a fairly new version for this. Current LTS should be fine. Either that or refer to the [Running in Docker section](#running-in-docker)

Pull down the repo and run `npm install` to install all the dependencies. You'll also need to specify certain environment variables. Refer to the [Variables section](#variables) for that detail.

## Variables

| Name                     | Description                                                                                        | Default value                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| AWS_REGION               | The region that we're running in, this is used to push to a particular log stream in the log group | This can commonly be read from the instance or the task def parameters but is provided here so that we can account for running not on AWS |
| AWS_LOGGROUP_NAME        | The CloudWatch Logs log group to push the messages to                                              | No default because required                                                                                                               |
| AWS_LOGGROUP_REGION      | The region that the CloudWatch Logs log group exists in                                            | No default because required                                                                                                               |
| EMIT_INTERVAL_IN_MINUTES | How often to emit messages                                                                         | 10 minutes                                                                                                                                |
| AWS_ACCESS_KEY_ID        | AWS credentials                                                                                    | This can also be read from the instance but it's here to account for when not running on AWS                                              |
| AWS_SECRET_ACCESS_KEY    | AWS credentials                                                                                    | This can also be read from the instance but it's here to account for when not running on AWS                                              |
| AWS_SESSION_TOKEN        | AWS credentials                                                                                    | This can also be read from the instance but it's here to account for when not running on AWS                                              |

## Running

Once you have the variables provided, simply running an `npm run emitter` will run the emitter code. Eventually this will actually push messages to log groups in your selected region. This disclaimer is here because log messages will start charging as they collect.

## Running in Docker
