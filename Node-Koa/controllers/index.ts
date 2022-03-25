import { Context, Next } from 'koa';
import { IUser } from '../models/IUser';

let users: Array<IUser> = [
  {
    id: "1",
    name: "A",
    email: "A@gmail.com",
    created_at: new Date('2022-01-01'),
    updated_at: new Date('2022-02-02')
  },
  {
    id: "2",
    name: "B",
    email: "B@gmail.com",
    created_at: new Date('2022-03-03'),
    updated_at: new Date('2022-04-04')
  },
  {
    id: "3",
    name: "C",
    email: "C@gmail.com",
    created_at: new Date('2022-05-05'),
    updated_at: new Date('2022-06-06')
  },
  {
    id: "4",
    name: "D",
    email: "D@gmail.com",
    created_at: new Date('2022-07-07'),
    updated_at: new Date('2022-08-08')
  },
  {
    id: "5",
    name: "E",
    email: "E@gmail.com",
    created_at: new Date('2022-09-09'),
    updated_at: new Date('2022-10-10')
  },
];

const getUsers = async (ctx: Context, next: Next) => {
  ctx.status = 200;
  ctx.body = users;
  await next();
};

const getUser = async (ctx: Context, next: Next) => {
  const user: IUser | undefined = searchUserById(ctx.params.id);
  if (user) {
    ctx.status = 200;
    ctx.body = user;
    await next();
  } else {
    ctx.status = 404;
    ctx.body = { message: `User not found.` };
    await next();
  }
};

const addUser = async (ctx: Context, next: Next) => {
  const user: IUser = ctx.request.body;
  user.created_at = new Date();
  user.updated_at = new Date();
  users.push(user);
  ctx.body = { message: 'OK' };
  ctx.status = 200;
  await next();
};

const updateUser = async (ctx: Context, next: Next) => {
  let user: IUser | undefined = searchUserById(ctx.params.id);
  if (user) {
    const updateUser: { name?: string; email?: string } = ctx.request.body;
    user = { ...user, ...updateUser, updated_at: new Date() };
    users = [...users.filter(user => user.id !== ctx.params.id), user];
    ctx.status = 200;
    ctx.body = { message: 'OK' };
  } else {
    ctx.status = 404;
    ctx.body = { message: `user not found` };
  }
};

const deleteUser = (ctx: Context, next: Next) => {
  users = users.filter(user => user.id !== ctx.params.id);
  ctx.body = { message: 'OK' };
  ctx.status = 200;
};

const searchUserById = (id: string): IUser | undefined =>
  users.filter(user => user.id === id)[0];

export { getUsers, getUser, addUser, updateUser, deleteUser };
