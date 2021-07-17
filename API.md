# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### CloudwatchAlarmsToTeamsConstruct <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct"></a>

#### Initializer <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.Initializer"></a>

```typescript
import { CloudwatchAlarmsToTeamsConstruct } from 'cloudwatch-alarms-to-teams'

new CloudwatchAlarmsToTeamsConstruct(scope: Construct, id: string, props: CloudwatchAlarmsToTeamsConstructProps)
```

##### `scope`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.props"></a>

- *Type:* [`cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstructProps`](#cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstructProps)

---

#### Methods <a name="Methods"></a>

##### `addAlarmToTeamsNotification` <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.addAlarmToTeamsNotification"></a>

```typescript
public addAlarmToTeamsNotification(alarm: Alarm)
```

###### `alarm`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.alarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---


#### Properties <a name="Properties"></a>

##### `lambdaFunction`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.lambdaFunction"></a>

- *Type:* [`@aws-cdk/aws-lambda-nodejs.NodejsFunction`](#@aws-cdk/aws-lambda-nodejs.NodejsFunction)

---

##### `topic`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstruct.topic"></a>

- *Type:* [`@aws-cdk/aws-sns.Topic`](#@aws-cdk/aws-sns.Topic)

---


## Structs <a name="Structs"></a>

### CloudwatchAlarmsToTeamsConstructProps <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstructProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CloudwatchAlarmsToTeamsConstructProps } from 'cloudwatch-alarms-to-teams'

const cloudwatchAlarmsToTeamsConstructProps: CloudwatchAlarmsToTeamsConstructProps = { ... }
```

##### `webhookUrl`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsConstructProps.webhookUrl"></a>

- *Type:* `string`

Provide a webhook url.

---



