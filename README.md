# CS361-Microservice

![Microservice](https://github.com/DevinFahnestock/CS361-Microservice/assets/46365417/4e2f89fa-ca47-4741-a414-3e308a389234)

## Recieving responses from the service
You can setup your service however you like, Here is an example of one way to do it
```
channel.assertQueue('',
{
  exclusive: true,
},
(error, q) => {
  channel.consume(
  q.queue,
  (msg) => {
    if (msg.properties.correlationId == correlationId) {
      response here
    }
  },
  {
    noAck: true,
  }
)
```

## Getting a random task recommendation
To get a random task, you will need to send a request to the service
the request takes no parameters and returns a JSON object of a random task

the call is `recommend-task`

Below is an example call to the service to recieve a random task:
```
channel.sendToQueue('recommend-task', Buffer.from(''), {
  correlationId: correlationId,
  replyTo: q.queue,
})
```

## Getting a users task list
To get a users task list, you will need to send a request to the service again
the request takes the parameter of the users ID

the call is `get-user-task-list`

Below is an example call to the service to recieve a random task:
```
channel.sendToQueue('get-user-task-list', (users ID here), {
  correlationId: correlationId,
  replyTo: q.queue,
})
```
