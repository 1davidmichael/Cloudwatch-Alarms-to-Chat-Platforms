# CloudWatch Alarm to Chat Platforms CDK Construct

This construct creates an SNS topic and Lambda used to translate CloudWatch alarms into notifications set to various chat platforms. Currently only Microsoft Teams is supported.

Example:

```typescript
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { Runtime } from '@aws-cdk/aws-lambda';
import * as _lambda from '@aws-cdk/aws-lambda-python';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import * as notifications from '../../Cloudwatch-Alarms-to-Chat-Platforms/src/index';
import * as path from 'path'
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import { countResources } from '@aws-cdk/assert';

export class TestCdkConstructStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const failureLambda = new _lambda.PythonFunction(this, 'FailureLambda', {
      entry: path.join(__dirname, '..', 'functions', 'failureLambda'),
      runtime: Runtime.PYTHON_3_8
    });

    const rule = new events.Rule(this, "Schedule", {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1))
    });

    rule.addTarget(new targets.LambdaFunction(failureLambda));

    const errors = failureLambda.metricErrors();

    errors.with({
      period: cdk.Duration.minutes(1),
    })

    const alarm = errors.createAlarm(this, "Alarm", {
      alarmName: "Example Lambda Alarm",
      alarmDescription: "This alarm will trigger when the lambda fails 2 out of 3 times in a given period",
      threshold: 2,
      evaluationPeriods: 3,
      period: cdk.Duration.minutes(1)
    });

    const note = new notifications.CloudwatchAlarmsToTeamsConstruct(this, "Notification", {
      webhookUrl: "https://test.webhook.office.com/webhookb2/example-webhook-goes-here"
    });

    note.addAlarmToTeamsNotification(alarm);
  }
}
```

## API

For specific API usage see the [API Docs](./API.md)