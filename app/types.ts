import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export interface Database {
  users: UserTable
  posts: PostTable
}

export interface UserTable {
  id: Generated<number>
  email: string
  password: string
  created_at: ColumnType<Date, string | undefined, never>
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

export interface PostTable {
  id: Generated<number>
  title: string
  content: string
  created_at: ColumnType<Date, string | undefined, never>
  user_id: number
  status: 'draft' | 'published'
}

export type Post = Selectable<PostTable>
export type NewPost = Insertable<PostTable>
export type PostUpdate = Updateable<PostTable>