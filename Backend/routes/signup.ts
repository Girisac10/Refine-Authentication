import express, { Request, Response, Express } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;

    const userExist = await prisma.users.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (userExist) {
      if (userExist.email === email) {
        return res.status(400).json({ message: 'Email already in use.' });
      }
       
      if (userExist.username === username) {
        return res.status(400).json({ message: 'User already Exist' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Respond with success
    return res.status(201).json({ signup: true, message: 'User created successfully', newUser });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default app;
