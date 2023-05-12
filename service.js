const express = require(express)
const app = express()
const port = 5000

const tasksList = [
    {title: "testTask1", description: "This is a test task for the task list manager app", due: "10/27/23"},
    {title: "testTask2", description: "This is another task", due: "8/14//23"},
    {title: "testTask3", description: "Heres another", due: "4/3/24"},
    
]

app.get('/recommend-task', (req, res) => {
    const result = tasksList[Math.floor(Math.random() * tasksList.length)]
    res.send(result)
})

app.get('/user-task-list', (req, res) => {
    console.log(req)
})

app.listen(port, () => {
    console.log(`Microservice Started... Running on port ${port}`)
})