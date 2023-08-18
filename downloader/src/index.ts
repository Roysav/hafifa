import * as amqp from "amqplib/callback_api";


const URL = "amqp://localhost:5672";

amqp.connect(URL,
    async function connect(error: Error, connection: amqp.Connection) {
        if (error)
            throw error;
        connection.createChannel((error1: Error, channel: amqp.Channel) => {
            if (error1)
                throw error1;
            channel.assertQueue('Requests', {
                durable: false,
            })
            channel.assertQueue('Responses', {
                durable: false,
            })
            channel.consume('Requests', (msg) => consumeRequest(channel, msg))
        });
    }
);


async function consumeRequest(channel: amqp.Channel, msg: amqp.Message | null) {
    if (!msg)
        return;
    console.log(msg.content.toString());
    const response = `Response to ${msg.content.toString()}`;
    console.log(response);
    channel.sendToQueue('Responses', Buffer.from(response));
}
