import { expect as expectCDK, countResources, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { CloudwatchAlarmsToTeams } from '../src';

/*
 * Example test
 */
test('SNS Topic Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  // WHEN
  new CloudwatchAlarmsToTeams(stack, 'MyTestConstruct', {
    webhookUrl: 'https://testhook.com',
  });
  // THEN
  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));
});

test('Lambda Function Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  // WHEN
  new CloudwatchAlarmsToTeams(stack, 'MyTestConstruct', {
    webhookUrl: 'https://testhook.com',
  });
  // THEN
  expectCDK(stack).to(countResources('AWS::Lambda::Function', 1));
});

test('Snapshot Test', () => {
  const stack = new cdk.Stack();
  new CloudwatchAlarmsToTeams(stack, 'Test', {
    webhookUrl: 'https://testhook.com',
  });
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
