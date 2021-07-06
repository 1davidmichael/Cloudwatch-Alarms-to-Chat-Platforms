#!/usr/bin/python3.3
import json
import os
import pymsteams


def lambda_handler(event, context):
    teams_message = pymsteams.connectorcard(os.environ["WEBHOOK"])

    msg = {
        "text": event['Records'][0]['Sns']['Message']
    }

    encoded_msg = json.dumps(msg).encode('utf-8')

    teams_message.title(msg['Records'][0]['Subject'])
    teams_message.text(encoded_msg['AlarmDescription'])

    # Set color based off alarm type
    if encoded_msg['NewStateValue'] == 'ALARM':
        color = '#FF0000'
    else:
        color = '#00FF00'

    teams_message.color(color)
    teams_message.send()
