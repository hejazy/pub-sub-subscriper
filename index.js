const  {PubSub} = require('@google-cloud/pubsub');

const init = async ()=>{
    const topicName = process.env.TOPIC || 'topic-name';
    const subscriptionName= process.env.SUBSCRIPTION || 'subscription-name'

    pubsub = new PubSub({projectId: process.env.PROJECT_ID});
    topic = await pubsub.topic(topicName);
    

    const subscription = topic.subscription(subscriptionName);
    console.log('--------------------------------------------')
    console.log(`start listening on topic: ${topicName}, subscription: ${subscriptionName}`)
    console.log('--------------------------------------------')
    subscription.on('message',(msg)=>{
        const content = JSON.parse(msg.data.toString());
        msg.ack()
        console.log(content);
    });
}


init();

