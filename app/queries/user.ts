import type { NewUser, User, UserUpdate } from '~/types'
import { db } from '../../database/kysely'

export async function findUserById(id: number) {
  return await db.selectFrom('users')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findUser(criteria: Partial<User>) {
  let query = db.selectFrom('users')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id)
  }

  if (criteria.email) {
    query = query.where('email', '=', criteria.email)
  }

  if (criteria.password) {
    query = query.where(
      'password',
      '=',
      criteria.password
    )
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  return await query.selectAll().execute()
}

export async function updateUser(id: number, updateWith: UserUpdate) {
  await db.updateTable('users').set(updateWith).where('id', '=', id).execute()
}

export async function createUser(user: NewUser) {
  return await db.insertInto('users')
    .values(user)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteUser(id: number) {
  return await db.deleteFrom('users').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}