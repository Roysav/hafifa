import * as amqp from 'amqplib/callback_api';

const URL = 'amqp://localhost'

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
            channel.consume('Responses', (msg) => consumeResponse(msg))
            startRequests(channel);
        });
    }
);


async function startRequests(channel: amqp.Channel) {
    const requestInfo = new Request({
        url: ""
    })
}

async function consumeResponse(msg: amqp.Message | null){
    if(!msg)
        return;
    console.log(msg.content.toString());
}




