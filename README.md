# פרויקט החפיפה של שביל
יצירת webscraper על האתר http://quotes.toscrape.com/ ואיחסון באמצעות microservices.

microservices: 
- [ ] downloader
- [x] spiders
- [ ] pipelines

- [x] rabbitmq
- [x] mongodb
  
### spiders
1. הservice ישלח בקשות HTTP ע"י הוספת הrequest לqueue בשם `Requests` rabbitmq.
2. הservice יאזין לqueue בשם `Responses` בrabbitmq, יעבד את הresponse ובמידת הצורך ישלח בקשות נוספות כמפורט בסעיף 1

### downloader
1. יאזין לqueue בשם `Requests` בrabbitmq ישלח את הבקשה לאינטרנט
2. כשתיתקבל תשובה לבקשה הוא יוסיף אותו לqueue בשם `Responses`

### pipelines
1. שרת שמקבל בקשות `POST` דרך endpoint: items.

## Protocols
### post to pipelines
*POST `/items/<collection: str>/<document_id: str>`*

body:

אובייקט JSON של הפרטים לגבי המוצר
- type: object

### `Requests` Queue
כל הודעה היא string של JSON מהפורמט הבא:
```javascript
{
  method: str
  url: str
  body?: any
}
```


### `Responses` Queue
כל הודעה היא string של JSON מהפורמט הבא:
```javascript
{
  request: Request // לפי הפורמט שמפורט בפרטוקול של `Requests` Queue
  body: any
}
```

