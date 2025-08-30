const app = require('./app');
const PORT = process.env.PORT || 7777
const ConnectDB = require('./src/db/db');
ConnectDB().
then(()=>{
    app.listen(PORT,()=>{
    console.log("server is listening on PORT",PORT)
})
console.log("Database Connection Established")
})
.catch((error)=>{
    console.log("Database Cannot Be Connected")
})
