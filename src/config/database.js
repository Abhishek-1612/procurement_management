const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://neosoft_task:neosoft@cluster0.9op8z.mongodb.net/neosoft_task?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true, 
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log("Connection Created");
}).catch((e) => {
    console.log("No Connection ");
})

