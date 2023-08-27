import datetime
import json
import logging
import os
from typing import TypedDict

import pika
import requests


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
)


class Request(TypedDict):
    method: str
    url: str
    body: str


class Response(TypedDict):
    request: Request
    body: str


HOST = os.environ['RABBITMQ_HOST']
PORT = os.environ['RABBITMQ_PORT']

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=HOST, port=PORT))
channel = connection.channel()
channel.queue_declare('Requests', durable=True)
channel.queue_declare('Responses', durable=True)


def consume(ch, method, properties, body: bytes):
    request: Request = json.loads(body)
    res = requests.request(
        method=request['method'],
        url=request['url'],
        data=request['body'],
    )
    response: Response = {
        'request': request,
        'body'   : res.content,
    }
    logging.log(logging.INFO, f'{datetime.datetime.now()} - {res.status_code} - {request["url"]}:\n{res.content}')
    channel.basic_publish(
        exchange='',
        routing_key='Responses',
        body=json.dumps(response),
    )


def main():
    channel.basic_consume(queue='Requests', on_message_callback=consume, auto_ack=True)
    logging.log(logging.INFO, ' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    main()
