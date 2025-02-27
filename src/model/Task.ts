import { Schema, model, Document } from 'mongoose';

// Define the User document interface
export interface ITask extends Document {
  title: string;
  description: string;
  createdAt:Date;
  updatedAt:Date;
}

// Define the User schema
const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  
});

taskSchema.pre('save',function(next){
  this.updatedAt = new Date();
  next();
})


// Create and export the User and FCM models
const Tasks = model<ITask>('Task', taskSchema);

export { Tasks};
