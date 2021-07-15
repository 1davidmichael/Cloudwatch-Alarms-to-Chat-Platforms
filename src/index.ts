import { execSync, ExecSyncOptions } from 'child_process';
import * as path from 'path';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import { Runtime } from '@aws-cdk/aws-lambda';
import * as lambda from '@aws-cdk/aws-lambda';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';
// import { spawnSync } from 'child_process';

export interface CloudwatchAlarmsToTeamsConstructProps {
  /**
   * Provide a webhook url.
   *
   */
  readonly webhookUrl: string;
}

export class CloudwatchAlarmsToTeamsConstruct extends cdk.Construct {

  public readonly lambdaFunction: lambda.SingletonFunction;
  public readonly topic: sns.Topic;

  constructor(scope: cdk.Construct, id: string, props: CloudwatchAlarmsToTeamsConstructProps) {
    super(scope, id);

    this.topic = new sns.Topic(this, 'SNSTopic');

    console.log(path.join(__dirname, 'functions', 'teamsLambda'));

    const execOptions: ExecSyncOptions = { stdio: ['ignore', process.stderr, 'inherit'] };

    this.lambdaFunction = new lambda.SingletonFunction(this, 'TransformFunction', {
      code: lambda.Code.fromAsset(path.join(__dirname, 'functions', 'teamsLambda'), {
        bundling: {
          image: lambda.Runtime.PYTHON_3_8.bundlingImage,
          local: {
            tryBundle(outputDir: string) {
              try {
                execSync('pip3 --version', execOptions);
              } catch {
                return false;
              }
              execSync(`pip3 install -r ${path.join(__dirname, 'functions', 'teamsLambda', 'requirements.txt')} -t ${outputDir}`);
              execSync(`cp -au ${path.join(__dirname, 'functions', 'teamsLambda')} ${outputDir}`);

              return true;
            },
          },
          command: [
            'bash', '-c',
            'pip install -r requirements.txt -t /asset-output && cp -au . /asset-output',
          ],
        },
      }),
      uuid: 'b1475680-a6b6-4c58-9fb8-19ffd4325f45',
      handler: 'index.handler',
      runtime: Runtime.PYTHON_3_8,
      environment: { WEBHOOK: props.webhookUrl },
    });

    this.lambdaFunction.addEventSource(new SnsEventSource(this.topic));
  }

  public addAlarmToTeamsNotification(alarm: cloudwatch.Alarm) {
    alarm.addOkAction(new cw_actions.SnsAction(this.topic));
    alarm.addAlarmAction(new cw_actions.SnsAction(this.topic));
  }
}
