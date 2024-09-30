import {Kafka, Producer} from 'kafkajs';


class KafkaProducer{
private static instance: KafkaProducer;
private producer: Producer;
private kafka: Kafka;

private constructor(){
    this.kafka = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
        brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
}

public static getInstance(): KafkaProducer{
    if(!KafkaProducer.instance){
        KafkaProducer.instance = new KafkaProducer();
    }
    return KafkaProducer.instance;
}

public async connect(){
    await this.producer.connect();
    console.log('Kafka Producer connected');
}

public async sendMessage(topic: string, message: any){
    const msgValue =JSON.stringify(message);
    try{
        await this.producer.send({
            topic,
            messages:[{ value:msgValue }],
        });
        console.log(`Message sent to Kafka: ${msgValue} from topic: ${topic}`);
    }
    catch(error){
        console.log('Error sending message to kafka: ${msgValue} from topic: ${topic}`);', error);
        // todo implement retry logic
    }
}

public async disconnect(){
    await this.producer.disconnect();
    console.log('Kafka Producer disconnected');
}

}


export default KafkaProducer;