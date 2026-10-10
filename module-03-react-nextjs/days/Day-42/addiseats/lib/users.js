import { scryptSync, timingSafeEqual } from 'node:crypto'

const users = [
  {
    id: 'user-customer-1',
    name: 'Demo Customer',
    email: 'customer@gmail.com',
    role: 'customer',
    salt: 'customer-demo-salt',
    passwordHash: 'a43dfa34094734045e7b8ddbc9324dc97cdc3bc1f1f175704cd55d9cae63aec6d37c0476b8b2ef5a4802553879586bfc5f31925ab354ba6d2786badd0686348d'
  },
  {
    id: 'user-staff-1',
    name: 'Demo Kitchen Staff',
    email: 'staff@gmail.com',
    role: 'staff',
    salt: 'staff-demo-salt',
    passwordHash: '9d38f51816380c6525719f87a8667cbfa8b4e17f2996e20eb254139b37625fd3dcfe331334b60b16a2edddb37c9e9bf720acbaa07e8e55c5c8f86c68d20b452b'
  }
]

const dummyHash = Buffer.from(users[0].passwordHash, 'hex')

export function authenticateUser(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') return null

  const normalizedEmail = email.trim().toLowerCase()
  const user = users.find((entry) => entry.email === normalizedEmail)
  const expected = user ? Buffer.from(user.passwordHash, 'hex') : dummyHash
  const salt = user ? user.salt : 'unknown-user-salt'
  const actual = scryptSync(password, salt, expected.length)

  if (!timingSafeEqual(actual, expected) || !user) return null
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}