import { resolveToken } from '../utils'

const users = {
  admin: {
    id: 1,
    name: 'Big face(admin)',
    avatar: 'https://static.isme.top/images/avatar.jpg',
    email: 'Ronnie@123.com',
    role: ['admin'],
  },
  editor: {
    id: 2,
    name: 'Big face(editor)',
    avatar: 'https://static.isme.top/images/avatar.jpg',
    email: 'Ronnie@123.com',
    role: ['editor'],
  },
  guest: {
    id: 3,
    name: 'Visitor(guest)',
    avatar: 'https://static.isme.top/images/avatar.jpg',
    role: [],
  },
}
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 0,
        data: {
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
