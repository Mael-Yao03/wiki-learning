import mongoose from 'mongoose'; 
 

const connectToDataBase = async () => { 
  // if (mongoose.connection.readyState) {
  //   return true;
  // }

  try { 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
    return false;
  }
};

export default connectToDataBase;
