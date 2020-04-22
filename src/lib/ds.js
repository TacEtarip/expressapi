import mongoose from 'mongoose';

export const connectDB = async(test) => {
    try {
        await mongoose.connect(test.database, { useNewUrlParser: true, useUnifiedTopology:true});
        console.log('Connected To DataBase');          
    } catch (error) {
        console.log(error.message);
        process.exit(0);
    }
};