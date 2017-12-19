// NOTE: To test it on local, you must use postman and create a post requets to local server: localhost:1337/webhook
// Replace senderId by your facebook id

// Postback
{
 "object":"page",
 "entry":[
   {
     "messaging":[
       {
         "timestamp":1458692752478,
         "postback":{
           "title": "<TITLE_FOR_THE_CTA>",
           "payload": "<USER_DEFINED_PAYLOAD>",
           "referral": {
             "ref": "<USER_DEFINED_REFERRAL_PARAM>",
             "source": "<SHORTLINK>",
             "type": "OPEN_THREAD",
           }
         },
         "sender":{
           "id":"635809929876700"
         },
         "recipient":{
           "id":"343712939436675"
         }
       }
     ]
   }
 ]
}


// message
{
 "object":"page",
 "entry":[
   {
     "messaging":[
       {
         "message":{
           "text":"Mess",
           "seq":20,
           "mid":"mid.1466015596912:7348aba4de4cfddf91"
         },
         "timestamp":1466015596919,
         "sender":{
           "id":"635809929876700"
         },
         "recipient":{
           "id":"343712939436675"
         }
       }
     ]
   }
 ]
}
