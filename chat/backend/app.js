const { Socket } = require('socket.io')
const questions = require('./data/Questions.json')
console.log(questions)
replies = questions.data
const io = require('socket.io')( 3006,{
    maxHttpBufferSize: 1e8,
    cors:{
      origin: "http://localhost:3000",
      methods:['GET','POST']
    }
  })

io.on("connection" , socket=>{
    const category = {"emotional abuse":0,"depression":0}
    var numberOfInterations = 0;
    
    console.log("Connection established")
    socket.on("send-message", delta => {
        numberOfInterations++
        console.log(delta)
        socket.emit("reply", { data:replies[Math.floor(Math.random()*replies.length)] , userFlag:"Bot" })
      })
    
})