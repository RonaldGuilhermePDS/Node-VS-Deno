import { Router } from 'https://deno.land/x/oak@v10.4.0/mod.ts';

import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/index.ts';

const routers = new Router();
routers
  .get('/users', getUsers)
  .get('/users/:id', getUser)
  .post('/users', addUser)
  .patch('/users/:id', updateUser)
  .delete('/users/:id', deleteUser);

export default routers;
