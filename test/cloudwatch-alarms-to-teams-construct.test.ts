import { expect as expectCDK, countResources } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CloudwatchAlarmsToTeamsConstruct from '../src/index';

/*
 * Example test
 */
test('SNS Topic Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  // WHEN
  new CloudwatchAlarmsToTeamsConstruct.CloudwatchAlarmsToTeamsConstruct(stack, 'MyTestConstruct', {
    webhookUrl: 'https://1davidmichaelgmail.webhook.office.com/webhookb2/ce2e260b-312b-4b57-93d5-2d0d2243627b@3b56a493-aa71-4b38-af6d-36ccb4291796/IncomingWebhook/8e5e3410f786481ab7c98ed113775ba0/82c5c4c4-66f2-4a38-9b09-32fc570cafb4',
  });
  // THEN
  expectCDK(stack).to(countResources('AWS::SNS::Topic', 1));
});

test('Lambda Function Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  // WHEN
  new CloudwatchAlarmsToTeamsConstruct.CloudwatchAlarmsToTeamsConstruct(stack, 'MyTestConstruct', {
    webhookUrl: 'https://1davidmichaelgmail.webhook.office.com/webhookb2/ce2e260b-312b-4b57-93d5-2d0d2243627b@3b56a493-aa71-4b38-af6d-36ccb4291796/IncomingWebhook/8e5e3410f786481ab7c98ed113775ba0/82c5c4c4-66f2-4a38-9b09-32fc570cafb4',
  });
  // THEN
  expectCDK(stack).to(countResources('AWS::Lambda::Function', 1));
});