import { Request, Response } from 'https://deno.land/x/oak@v10.4.0/mod.ts';

import { IUser } from '../models/IUser.ts';

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

const getUsers = ({ response }: { response: Response }) => {
  response.status = 200;
  response.body = users;
};

const getUser = ({ params, response }: { params: { id: string }; response: Response }) => {
  const user: IUser | undefined = searchUserById(params.id);
  if (user) {
    response.status = 200;
    response.body = user;
  } else {
    response.status = 404;
    response.body = { message: `User not found.` };
  }
};

const addUser = async ({ request, response }: { request: Request; response: Response }) => {
  const body = await request.body().value;
  const user: IUser = body;
  user.created_at = new Date();
  user.updated_at = new Date();
  users.push(user);
  response.body = { message: 'OK' };
  response.status = 200;
};

const updateUser = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: Request;
  response: Response;
}) => {
  let user: IUser | undefined = searchUserById(params.id);
  if (user) {
    const body = await request.body().value;
    const updateUser: { name?: string; email?: string } = body;
    user = { ...user, ...updateUser, updated_at: new Date() };
    users = [...users.filter(user => user.id !== params.id), user];
    response.status = 200;
    response.body = { message: 'OK' };
  } else {
    response.status = 404;
    response.body = { message: `user not found` };
  }
};

const deleteUser = ({ params, response }: { params: { id: string }; response: Response }) => {
  users = users.filter(user => user.id !== params.id);
  response.body = { message: 'OK' };
  response.status = 200;
};

const searchUserById = (id: string): IUser | undefined =>
  users.filter(user => user.id === id)[0];

export { getUsers, getUser, addUser, updateUser, deleteUser };
