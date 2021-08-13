# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### CloudwatchAlarmsToTeams <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams"></a>

#### Initializer <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.Initializer"></a>

```typescript
import { CloudwatchAlarmsToTeams } from 'cloudwatch-alarms-to-teams'

new CloudwatchAlarmsToTeams(scope: Construct, id: string, props: CloudwatchAlarmsToTeamsProps)
```

##### `scope`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.parameter.props"></a>

- *Type:* [`cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsProps`](#cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsProps)

---

#### Methods <a name="Methods"></a>

##### `addAlarmToTeamsNotification` <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.addAlarmToTeamsNotification"></a>

```typescript
public addAlarmToTeamsNotification(alarm: Alarm)
```

###### `alarm`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.parameter.alarm"></a>

- *Type:* [`@aws-cdk/aws-cloudwatch.Alarm`](#@aws-cdk/aws-cloudwatch.Alarm)

---


#### Properties <a name="Properties"></a>

##### `lambdaFunction`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.property.lambdaFunction"></a>

- *Type:* [`@aws-cdk/aws-lambda-python.PythonFunction`](#@aws-cdk/aws-lambda-python.PythonFunction)

---

##### `topic`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeams.property.topic"></a>

- *Type:* [`@aws-cdk/aws-sns.Topic`](#@aws-cdk/aws-sns.Topic)

---


## Structs <a name="Structs"></a>

### CloudwatchAlarmsToTeamsProps <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { CloudwatchAlarmsToTeamsProps } from 'cloudwatch-alarms-to-teams'

const cloudwatchAlarmsToTeamsProps: CloudwatchAlarmsToTeamsProps = { ... }
```

##### `webhookUrl`<sup>Required</sup> <a name="cloudwatch-alarms-to-teams.CloudwatchAlarmsToTeamsProps.property.webhookUrl"></a>

- *Type:* `string`

Provide a webhook url.

---



