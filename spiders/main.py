import json
import os
import sys
from typing import TypedDict

import parsel as parsel
import pika
import requests


class Request(TypedDict):
    method: str
    url: str
    body: str


class Response(TypedDict):
    request: Request
    body: str


BASE_URL = 'http://quotes.toscrape.com/'
HOST = os.environ['RABBITMQ_HOST']
PORT = os.environ['RABBITMQ_PORT']

connection = pika.BlockingConnection(pika.ConnectionParameters(
    host=HOST,
    port=PORT,
))

channel = connection.channel()
channel.queue_declare('Requests')
channel.queue_declare('Responses')


def send_request(
        method: str,
        url: str,
        body: any = None,
) -> None:
    message_body = {
        'method': method,
        'url'   : url,
    }
    if body is not None:
        message_body['body'] = body

    message_raw = json.dumps(message_body)
    channel.basic_publish(
        exchange='',
        routing_key='Requests',
        body=message_raw,
    )


def save_item(collection: str, document_id: str, item: dict):
    ...


def parse_quote(selector: parsel.Selector) -> dict:
    return {
        'text'  : selector.css('span.text::text').get(),
        'author': selector.css('span > small.author::text').get(),
        'tags'  : selector.css('div.tags a.tag::text').getall(),
    }


def consume(ch, method, properties, body: bytes):
    body: Request = json.loads(body)
    selector = parsel.Selector(body['body'])
    for quote_div in selector.css('div.col-md-8 > div.quote'):
        dct = parse_quote(quote_div)
        print(dct)
    next_page_href = BASE_URL + selector.css('ul.pager > li.next > a::attr(href)').get()
    send_request('GET', next_page_href)
    return


def main():
    res = requests.get(BASE_URL)
    channel.basic_publish('', 'Responses', json.dumps({
        'request': {
            'method': 'GET',
            'url': 'http://quotes.toscrape.com/',
        },
        'body': res.content.decode('utf-8'),
    }))
    channel.basic_consume('Responses', auto_ack=True, on_message_callback=consume)
    channel.start_consuming()


if __name__ == '__main__':
    main()
