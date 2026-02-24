import amql from 'amqplib';

let Channel:amql.Channel;

export const connectRabbitMQ = async () => {
    try {
        const connection=await amql.connect({
            protocol:'amqp',
            hostname:process.env.RABBITMQ_HOST,
            port:parseInt(process.env.RABBITMQ_PORT || '5672'),
            username:process.env.RABBITMQ_USER,
            password:process.env.RABBITMQ_PASSWORD
        });
        Channel=await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
        };     

export const publishToQueue=async(queue:string,data:any)=>{
    if(!Channel){
        console.error('RabbitMQ channel is not established');
        return;
    } 
    await Channel.assertQueue(queue,{durable:true});
    Channel.sendToQueue(queue,Buffer.from(JSON.stringify(data)),{persistent:true}); 
}