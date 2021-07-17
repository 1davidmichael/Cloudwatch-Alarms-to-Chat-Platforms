import * as axios from 'axios';


exports.handler = async function(event: any, _context: any) {
  console.log('event:', JSON.stringify(event));

  const webhookUri = process.env.MS_TEAMS_WEBHOOK as string;

  const alarm = JSON.parse(event.Records[0].Sns.Message);
  const alarmName = alarm.AlarmName;
  const alarmState = alarm.NewStateValue;
  const alarmReason = alarm.NewStateReason;

  const alarmColor = getColor(alarmState);

  console.log(`${alarmName} - ${alarmReason} - ${alarmState} - ${alarmColor}`);


  const webhookBody = JSON.stringify({
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    'summary': alarmName,
    'themeColor': alarmColor,
    'title': 'CloudWatch Notification',
    'sections': [
      {
        activityTitle: alarmName,
        activitySubtitle: alarmState,
        activityImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/AWS_Simple_Icons_Monitoring_Amazon_CloudWatch.svg/1200px-AWS_Simple_Icons_Monitoring_Amazon_CloudWatch.svg.png',
        text: alarmReason,
      },
    ],
  });

  const response = await axios.default.post(webhookUri, webhookBody);
  console.log(`Response is: ${response.status}`);

};

function getColor(alarmState: string): string {

  let alarmColor = 'FFC300';

  if ( alarmState == 'ALARM') {
    alarmColor = 'FF0000';
  } else if ( alarmState == 'OK') {
    alarmColor = '27AE60';
  }

  return alarmColor;
}