FROM python

WORKDIR /app/
COPY requirements.txt /app/requirements.txt
COPY main.py /app/main.py
RUN "pip install -r requirements.txt"

ARG RABBITMQ_HOST
ARG RABBITMQ_PORT


CMD ["python3", "main.py"]