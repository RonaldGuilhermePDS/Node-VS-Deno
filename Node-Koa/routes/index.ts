import * as Router from 'koa-router';

import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/index';

const routers = new Router();

routers
  .get('/users', getUsers)
  .get('/users/:id', getUser)
  .post('/users', addUser)
  .patch('/users/:id', updateUser)
  .delete('/users/:id', deleteUser);

export default routers;
