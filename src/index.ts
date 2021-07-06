import { Runtime } from '@aws-cdk/aws-lambda';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as pylambda from '@aws-cdk/aws-lambda-python';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';

export interface CloudwatchAlarmsToTeamsConstructProps {
  /**
   * Provide a webhook url.
   *
   */
  readonly webhookUrl: string;
}
export class CloudwatchAlarmsToTeamsConstruct extends cdk.Construct {

  public readonly lambdaFunction: pylambda.PythonFunction;
  public readonly topic: sns.Topic;

  constructor(scope: cdk.Construct, id: string, props: CloudwatchAlarmsToTeamsConstructProps) {
    super(scope, id);

    this.topic = new sns.Topic(this, 'SNSTopic');

    this.lambdaFunction = new pylambda.PythonFunction(this, 'TransformFunction', {
      entry: 'src/functions/teamsLambda',
      index: 'index.py',
      handler: 'handler',
      runtime: Runtime.PYTHON_3_8,
      environment: { WEBHOOK: props.webhookUrl },
    });

    this.lambdaFunction.addEventSource(new SnsEventSource(this.topic));
  }
}
