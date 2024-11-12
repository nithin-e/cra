import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the ITodo interface
export interface ITodo extends Document {
    description: string;
}

// Define the schema
const todoSchema: Schema<ITodo> = new Schema({
    description: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true,
});

// Define and export the model
const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', todoSchema);
export default Todo;
