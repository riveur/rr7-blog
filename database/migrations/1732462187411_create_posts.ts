import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('posts')
		.addColumn('id', 'integer', (col) => col.primaryKey())
		.addColumn('title', 'text', (col) => col.notNull())
		.addColumn('content', 'text', (col) => col.notNull())
		.addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull())
		.addColumn('created_at', 'text', (col) =>
			col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
		)
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('posts').execute()
}
