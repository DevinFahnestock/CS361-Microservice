var amqp = require('amqplib/callback_api')

//test data
const tasksList = [
  {
    title: 'Task 1',
    description: 'Complete project proposal',
    dueDate: '2023-05-15',
    createdDate: '2023-05-10',
  },
  {
    title: 'Task 2',
    description: 'Review marketing campaign',
    dueDate: '2023-05-18',
    createdDate: '2023-05-11',
  },
  {
    title: 'Task 3',
    description: 'Prepare presentation slides',
    dueDate: '2023-05-20',
    createdDate: '2023-05-11',
  },
  {
    title: 'Task 4',
    description: 'Follow up with clients',
    dueDate: '2023-05-17',
    createdDate: '2023-05-09',
  },
  {
    title: 'Task 5',
    description: 'Organize team meeting',
    dueDate: '2023-05-14',
    createdDate: '2023-05-10',
  },
]

const userTasks = {
  users: {
    'User 1': {
      tasks: [
        {
          title: 'Task 1',
          description: 'Complete project proposal',
          dueDate: '2023-05-15',
          createdDate: '2023-05-10',
        },
        {
          title: 'Task 2',
          description: 'Review marketing campaign',
          dueDate: '2023-05-18',
          createdDate: '2023-05-11',
        },
        {
          title: 'Task 3',
          description: 'Prepare presentation slides',
          dueDate: '2023-05-20',
          createdDate: '2023-05-11',
        },
      ],
    },
    'User 2': {
      tasks: [
        {
          title: 'Task 1',
          description: 'Follow up with clients',
          dueDate: '2023-05-17',
          createdDate: '2023-05-09',
        },
        {
          title: 'Task 2',
          description: 'Organize team meeting',
          dueDate: '2023-05-14',
          createdDate: '2023-05-10',
        },
        {
          title: 'Task 3',
          description: 'Prepare monthly report',
          dueDate: '2023-05-25',
          createdDate: '2023-05-12',
        },
      ],
    },
    'User 3': {
      tasks: [
        {
          title: 'Task 1',
          description: 'Research new market trends',
          dueDate: '2023-05-19',
          createdDate: '2023-05-10',
        },
        {
          title: 'Task 2',
          description: 'Update website content',
          dueDate: '2023-05-16',
          createdDate: '2023-05-11',
        },
        {
          title: 'Task 3',
          description: 'Prepare training materials',
          dueDate: '2023-05-21',
          createdDate: '2023-05-12',
        },
      ],
    },
    'User 4': {
      tasks: [
        {
          title: 'Task 1',
          description: 'Review financial statements',
          dueDate: '2023-05-23',
          createdDate: '2023-05-09',
        },
        {
          title: 'Task 2',
          description: 'Coordinate product launch',
          dueDate: '2023-05-13',
          createdDate: '2023-05-10',
        },
        {
          title: 'Task 3',
          description: 'Attend industry conference',
          dueDate: '2023-05-28',
          createdDate: '2023-05-11',
        },
      ],
    },
    'User 5': {
      tasks: [
        {
          title: 'Task 1',
          description: 'Develop new feature',
          dueDate: '2023-05-22',
          createdDate: '2023-05-10',
        },
        {
          title: 'Task 2',
          description: 'Conduct user testing',
          dueDate: '2023-05-24',
          createdDate: '2023-05-11',
        },
        {
          title: 'Task 3',
          description: 'Optimize website performance',
          dueDate: '2023-05-26',
          createdDate: '2023-05-12',
        },
      ],
    },
  },
}

// reply functions
const recommendUser = (error1, channel) => {
  if (error1) {
    throw error1
  }

  channel.assertQueue('recommend-task', {
    durable: false,
  })

  channel.consume('recommend-task', (msg) => {
    const result = tasksList[Math.floor(Math.random() * tasksList.length)]

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)), {
      correlationId: msg.properties.correlationId,
    })
    channel.ack(msg)
  })
}

const getUserTaskList = (error1, channel) => {
  if (error1) {
    throw error1
  }
  console.log(channel)

  channel.assertQueue('get-user-task-list', {
    durable: false,
  })

  channel.consume('get-user-task-list', (msg) => {
    const result = userTasks.users[msg.content.toString()].tasks

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result)), {
      correlationId: msg.properties.correlationId,
    })
    channel.ack(msg)
  })
}

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0
  }

  connection.createChannel(recommendUser)
  connection.createChannel(getUserTaskList)
})
