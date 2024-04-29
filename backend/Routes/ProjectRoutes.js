import express from 'express'
import projectController from '../Controllers/projectController.js'
import verifyToken from '../Middleware/VerifyToken.js';

const router = express.Router();

router.post('/',verifyToken, projectController.setProject)
router.get('/',verifyToken,projectController.getProjects);
// router.get('/summary',projectController.getProjectSummary)
export default router;