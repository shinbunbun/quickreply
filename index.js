'use strict';
const line = require('@line/bot-sdk');
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });

exports.handler = function (event, context) {
    let events = JSON.parse(event.body).events;
    events.forEach(function (event) {
        if (event.type == "message") {
            var message = reply(event);
        }
        client.replyMessage(event.replyToken, message)
            .then((response) => {
                let lambdaResponse = {
                    statusCode: 200,
                    headers: { "X-Line-Status": "OK" },
                    body: '{"result":"completed"}'
                };
                context.succeed(lambdaResponse);
            }).catch((err) => console.log(err));
    });

};

function reply(event) {
    const userMessage = event.message.text;

    if (userMessage == "クイックリプライテスト") {
        var message = {
            "type": "text",
            "text": "選択してください",
            "quickReply": {
                "items": [
                    {
                        "type": "action",
                        "action": {
                            "type": "camera",
                            "label": "カメラ"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "cameraRoll",
                            "label": "カメラロール"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "location",
                            "label": "位置情報"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "postback",
                            "label": "ポストバック",
                            "data": "test"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "message",
                            "label": "メッセージ",
                            "text": "test"
                        }
                    },
                    {
                        "type": "action",
                        "action": {
                            "type": "datetimepicker",
                            "label": "日時選択",
                            "data": "datetime",
                            "mode": "datetime"
                        }
                    }
                ]
            }
        };
    }
    return message;
}