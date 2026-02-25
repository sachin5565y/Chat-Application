import amqp from "amqplib";
import nodemialer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const startSendOtpConsumer = async () => {
try {    
    const connection=await amqp.connect({

    });
    const channel=await connection.createChannel();
    const queueName="send-otp";

    await channel.assertQueue(queueName,{durable:true});
    console.log("✅Mail serveice consumer started, listeing for opt emails...");

    channel.consume(queueName,async(msg)=>{
        if(msg){
            try {
                const {to,subect,body}=JSON.parse(msg.content.toString());
                const transporter=nodemialer.createTransport({
                    host:"smtp.gamil.com",
                    port:465,
                    auth:{
                        user:process.env.USER,
                        pass:process.env.PASSWORD}
                });
                await transporter.sendMail({
                    from:process.env.USER,
                    to,
                    subject:subect,
                    text:body
                });
                channel.ack(msg);
            } catch (error) {
                console.log("Failed to send otp email:", error);
                
            }
        }
    });
} catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
}
}