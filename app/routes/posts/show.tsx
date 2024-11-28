import { EditorContent, useEditor } from "@tiptap/react"
import { data, Form, Link } from "react-router"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { findPostById } from "~/queries/post.server"
import type { Route } from "./+types/show"
import { extensions } from "./editor"

export async function loader({ params }: Route.LoaderArgs) {
  const post = await findPostById(Number(params.id))

  if (!post) {
    throw data('Post not found', { status: 404 })
  }

  return post
}

export default function Page({ loaderData: post }: Route.ComponentProps) {
  const editor = useEditor({
    extensions: extensions,
    content: post.content,
    editable: false
  })

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Post details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <dl className="grid grid-cols-2 gap-4">
            <dt className="font-semibold">ID</dt>
            <dd>{post.id}</dd>
            <dt className="font-semibold">Title</dt>
            <dd>{post.title}</dd>
            <dt className="font-semibold">Status</dt>
            <dd>
              <Badge>{post.status.toUpperCase()}</Badge>
            </dd>
            <dt className="font-semibold">Created At</dt>
            <dd>{String(post.created_at)}</dd>
            <dt className="font-semibold">Actions</dt>
            <dd className="flex items-center gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/posts/${post.id}/edit`}>Edit</Link>
              </Button>
              <Form action={`/posts/${post.id}/delete`} method="delete">
                <Button type="submit" size="sm">
                  Delete
                </Button>
              </Form>
            </dd>
          </dl>
          <div className="space-x-2">
            <h2 className="font-semibold">Content</h2>
            <EditorContent editor={editor} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}