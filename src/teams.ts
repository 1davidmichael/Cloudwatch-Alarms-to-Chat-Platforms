import * as path from 'path';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import { Runtime } from '@aws-cdk/aws-lambda';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as lambda from '@aws-cdk/aws-lambda-python';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';


export interface CloudwatchAlarmsToTeamsProps {
  /**
   * Provide a webhook url.
   *
   */
  readonly webhookUrl: string;
}

export class CloudwatchAlarmsToTeams extends cdk.Construct {

  public readonly lambdaFunction: lambda.PythonFunction;
  public readonly topic: sns.Topic;

  constructor(scope: cdk.Construct, id: string, props: CloudwatchAlarmsToTeamsProps) {
    super(scope, id);

    this.topic = new sns.Topic(this, 'SNSTopic');

    this.lambdaFunction = new lambda.PythonFunction(this, 'AlarmFunction', {
      runtime: Runtime.PYTHON_3_8,
      entry: path.join(__dirname, '../functions', 'teams'),
      description: 'CloudWatch Alarms to Microsoft Teams Webhook',
      environment: {
        MS_TEAMS_WEBHOOK: props.webhookUrl,
      },
    });

    this.lambdaFunction.addEventSource(new SnsEventSource(this.topic));
  }

  public addAlarmToTeamsNotification(alarm: cloudwatch.Alarm) {
    alarm.addOkAction(new cw_actions.SnsAction(this.topic));
    alarm.addAlarmAction(new cw_actions.SnsAction(this.topic));
  }
}
