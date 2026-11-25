import { Router } from 'express';
import {
  loginAdmin,
  verifyInvitation,
  signupWithInvitation,
  forgotPassword,
  resetPassword,
  updateProfile,
} from '../controllers/adminAuthController.js';
import { requireAdminAuth } from '../middleware/adminAuthMiddleware.js';

const router = Router();

router.post('/login', loginAdmin);
router.get('/invitations/verify', verifyInvitation);
router.post('/signup', signupWithInvitation);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.put('/profile', requireAdminAuth, updateProfile);

export default router;
