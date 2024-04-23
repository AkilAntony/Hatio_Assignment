import express from 'express'
import todoController from '../Controllers/todoController.js'
 import verifyToken from '../Middleware/VerifyToken.js';
const router = express.Router();

router.get('/',verifyToken,todoController.getTodo)
router.post('/',verifyToken,todoController.postTodo)
router.put('/:id', todoController.putTodo)
router.delete('/:id',verifyToken, todoController.deleteTodo)

export default router