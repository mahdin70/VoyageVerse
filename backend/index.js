const express = require('express');
const app = express();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

app.listen(5000, () => {
    console.log('Server is running on port 5000')
});