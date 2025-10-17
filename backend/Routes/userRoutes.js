import express from 'express';
import { loginUser, registerUser, deleteUser, updateUser } from '../Controllers/usereControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// REGISTER User
// POST /api/users/register
userRouter.post('/register', async (req, res, next) => {
  try {
    // Optional: validate request body
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    await registerUser(req, res);
  } catch (err) {
    next(err);
  }
});

// LOGIN User
// POST /api/users/login
userRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    await loginUser(req, res);
  } catch (err) {
    next(err);
  }
});

// DELETE User
// DELETE /api/users/delete
userRouter.delete('/delete', authMiddleware, deleteUser);

// UPDATE User
// PUT /api/users/update
userRouter.put('/update', authMiddleware, updateUser);

export default userRouter;
