import KafkaCommonConsumer from "../kafka/consumer";


const startConsumer = async(topic: string)=>{
    try{
        const consumer = KafkaCommonConsumer.getInstance();
        await consumer.connect();
        await consumer.subscribe(topic);
    
        await consumer.run(async ({topic,partition, message})=>{
            const value = message.value?.toString();
            console.log(`Processing message from topic: ${topic} value: ${value}`);
            // Process based on value

        })
    }
    catch(error){
        //Error handling
        console.log(`Error occured from consuming from topic: ${topic} error:${error}`);
    }

}


export default startConsumer;
