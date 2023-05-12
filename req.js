var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1
    }

    channel.assertQueue(
      '',
      {
        exclusive: true,
      },
      (error2, q) => {
        if (error2) {
          throw error2
        }
        var correlationId = generateUuid()

        channel.consume(
          q.queue,
          (msg) => {
            if (msg.properties.correlationId == correlationId) {
              console.log(JSON.parse(msg.content.toString()))
              connection.close()
              process.exit(0)
            }
          },
          {
            noAck: true,
          }
        )

        channel.sendToQueue('recommend-task', Buffer.from(''), {
          correlationId: correlationId,
          replyTo: q.queue,
        })

        channel.sendToQueue('get-user-task-list', Buffer.from('User 1'), {
          correlationId: correlationId,
          replyTo: q.queue,
        })
      }
    )
  })
})

function generateUuid() {
  return Math.random().toString() + Math.random().toString() + Math.random().toString()
}
