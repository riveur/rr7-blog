import type { NewPost, Post, PostUpdate } from '~/types'
import { db } from '../../database/kysely'

export async function findPostById(id: number) {
  return await db.selectFrom('posts')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findPost(criteria: Partial<Post>) {
  let query = db.selectFrom('posts')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id)
  }

  if (criteria.title) {
    query = query.where('title', 'like', criteria.title)
  }

  if (criteria.content) {
    query = query.where(
      'content',
      'like',
      criteria.content
    )
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  return await query.selectAll().execute()
}

export async function updatePost(id: number, updateWith: PostUpdate) {
  await db.updateTable('posts').set(updateWith).where('id', '=', id).execute()
}

export async function createPost(post: NewPost) {
  return await db.insertInto('posts')
    .values(post)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deletePost(id: number) {
  return await db.deleteFrom('posts').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}