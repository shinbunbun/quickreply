var access_token = "とーくん";//スクリプトプロパティに入れるのもありかも
function doPost(e) {
    //jsonをパース
    var events = JSON.parse(e.postData.contents).events;
    events.forEach(function (event) {
        //イベントタイプによって振り分け
        if (event.type == "message") {
            reply(event);
        }
    });
}

//イベントタイプがメッセージだった場合
function reply(e) {
    //メッセージとuserIdを取り出す
    var user_message = e.message.text,
        user_id = e.source.userId;
    //メッセージがクイックリプライテストだった場合
    if (user_message == "クイックリプライテスト") {
        var message = {
            "replyToken": e.replyToken,
            "messages": [{
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
            }]
        };
    }
    var replyData = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token
        },
        "payload": JSON.stringify(message)
    };
    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", replyData);
}