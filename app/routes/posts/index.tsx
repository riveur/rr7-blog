import { Link } from "react-router"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { findPost } from "~/queries/post.server"
import type { Route } from "./+types/index"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export async function loader() {
  const posts = await findPost({})
  return posts
}

export default function Page({ loaderData: posts }: Route.ComponentProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle>Posts</CardTitle>
          <CardDescription>List of posts</CardDescription>
        </div>
        <Button asChild>
          <Link to="/posts/add">
            Add post
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={posts} />
      </CardContent>
    </Card>
  )
}