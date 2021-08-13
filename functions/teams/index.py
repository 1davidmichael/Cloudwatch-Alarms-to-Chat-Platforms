import json
import os
import pymsteams


def handler(event, context):
    teams_message = pymsteams.connectorcard(os.environ["WEBHOOK"])

    msg = event['Records'][0]['Sns']['Message']
    msg = json.loads(msg)
    print(msg)

    teams_message.title(msg['AlarmName'])
    teams_message.text(msg['NewStateReason'])

    alarm_state = msg['NewStateValue']

    # Set color based off alarm type
    # https://aws.amazon.com/blogs/aws/amazon-cloudwatch-alarms/
    if alarm_state == 'ALARM':
        color = '#FF0000'
    elif alarm_state == "OK":
        color = '#00FF00'
    else:
        color = '#FFFF00'

    teams_message.color(color)
    teams_message.send()
