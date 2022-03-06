import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';
import { AuthUserMiddleware } from '../middlewares/auth-user.middleware';

const userRouter = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController';

const CreateUserHandler       = new CreateUserController().handle
const UpdateUserAvatarHandler = new UpdateUserAvatarController().handler

userRouter.post('/', CreateUserHandler)

userRouter.patch(
  '/avatar', 
  AuthUserMiddleware, 
  uploadAvatar.single('avatar'), 
  UpdateUserAvatarHandler
)

export { userRouter }