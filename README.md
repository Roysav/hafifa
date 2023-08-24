# פרויקט החפיפה של שביל
microservices: 
- [ ] downloader
- [ ] spiders
- [ ] pipelines

- [x] rabbitmq
- [x] mongodb
  
## building the spiders service
1. הservice ישלח בקשות HTTP ע"י הוספת הrequest לqueue בשם `Requests` rabbitmq.
2. הservice יאזין לqueue בשם `Responses` בrabbitmq, יעבד את הresponse במידת הצורך ישלח בקשות נוספות כמפורט ב[סעיף 1](building-the-spiders-service#)
