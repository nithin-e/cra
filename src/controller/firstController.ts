import { Request, response, Response } from 'express';
import Todo, { ITodo } from '../model/addTaskModel';
import { create } from 'ts-node';

const firstController = {
    getHome: async (req:Request, res:Response) => {
        let allTask= await Todo.find()
        res.render('todo_homepage',{allTask})
    },

    Add_task: async (req: Request, res: Response): Promise <Response> => {
     try {
        const {task} = req.body


        if (!task || task.trim() === '') {
            return res.status(400).json({ message: 'Task description is required' });
        }
        const exist= await Todo.findOne({description:task})
        if (exist) {
            return res.status(400).json({ success:false,message: 'This task is already scheduled' });
        }else{

            const newTask = new Todo({
                description: task,
            });
                await newTask.save()
          return res.status(201).json({success:true,message: 'task scheduled successfully'})
        }

     } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ message: 'Failed to add task', error: (error as Error).message }); 
     }
    },

        delete_task: async (req: Request, res: Response): Promise<Response> => {
         try {
            console.log('......req.body.....',req.params);
            
            const {id}=req.params

            const deletedTask = await Todo.findByIdAndDelete(id);
            
            return res.json({success:true, message:'task deleted'})
         } catch (error) {
            console.log('error',error);
            return res.status(500).json({ message: 'Failed to add task', error: (error as Error).message }); 

         }

    },

    edit_task: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { edited } = req.body;
            console.log('....check the id....',edited);
            
    
            if (!edited || typeof edited !== 'string' || edited.trim().length === 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Task description is required and must be a non-empty string' 
                });
            }
    
          
            const finding_Task = await Todo.findOne({ _id: id });
            if (!finding_Task) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Task not found' 
                });
            }
    
            // Check for duplicate task description, excluding the current task by its ID
            const duplicate = await Todo.findOne({
                description: edited
            });
            console.log('.....dup......',duplicate);
            
    
            if (duplicate) {
                return res.status(409).json({ 
                    success: false, 
                    message: 'The same task already exists' 
                });
            }
    
            // Update task description
            finding_Task.description = edited.trim();
            await finding_Task.save();
    
            return res.status(200).json({ 
                success: true, 
                message: 'Successfully edited',
                task: finding_Task 
            });
    
        } catch (error) {
            console.error('Error editing task:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to edit task', 
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    
    
    
}

export default firstController;