FROM python

COPY requirements.txt /app/requirements.txt
WORKDIR /app

RUN pip install -r requirements.txt

COPY main.py /app/main.py

ARG RABBITMQ_HOST
ARG RABBITMQ_PORT

CMD ["python", "main.py"]