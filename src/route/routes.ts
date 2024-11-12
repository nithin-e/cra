

import controll from '../controller/firstController'; 

import { Router } from 'express';

const router = Router();

// Define your routes here

router.get('/',controll.getHome)
router.post('/Add-Task',controll.Add_task)
router.post('/delete_Task/:id',controll.delete_task)
router.post('/edit-tak/:id',controll.edit_task)


export default router; 
