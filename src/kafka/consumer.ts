import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';

class KafkaCommonConsumer{
    private static instance: KafkaCommonConsumer;
    private consumer: Consumer;
    private kafka: Kafka;

    private constructor(){
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID || 'my_app',
            brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
        });
        this.consumer = this.kafka.consumer({groupId: 'common-consumer-group'}); 
    }
    
    public static getInstance(): KafkaCommonConsumer{
        if(!KafkaCommonConsumer.instance){
            KafkaCommonConsumer.instance = new KafkaCommonConsumer();
        }
        return KafkaCommonConsumer.instance;
    }

    public async connect(){
        await this.consumer.connect();
        console.log('Kafka consumer connected');
    }

    public async subscribe(topic: string){
        await this.consumer.subscribe({topic, fromBeginning: true});
        console.log(`subscribed to topic:${topic}`);
    }

    public async run(onMessage: (message: EachMessagePayload)=> Promise<void>){
        await this.consumer.run({
            eachMessage: async ({topic, partition, message, heartbeat, pause }) =>{
                const value = message.value?.toString();
                console.log(`Received mesage from topic: ${topic}, partition: ${partition},  message: ${value}`);
                try{
                    // Process based on value
                }
                catch(error){
                    console.log(`Error occured while processing`,error);
                    pause();
                }
                await heartbeat();
                // await onMessage({topic, partition, message});
            }
        });
    }

    public async disconnect(){
        await this.consumer.disconnect();
        console.log('Kafka Consumer disconnected')
    }
}

export default KafkaCommonConsumer;