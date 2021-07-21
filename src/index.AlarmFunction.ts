import * as https from 'https';
import * as url from 'url';


exports.handler = async function(event: any, _context: any) {
  console.log('event:', JSON.stringify(event));

  const webhookUri = new url.URL(process.env.MS_TEAMS_WEBHOOK as string);

  const hostname = webhookUri.hostname;
  const path = webhookUri.pathname;

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
  const options = {
    hostname: hostname,
    port: 443,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': webhookBody.length,
    },
  };

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(webhookBody);
  req.end();
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
