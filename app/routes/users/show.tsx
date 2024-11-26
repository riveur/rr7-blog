import { data, Form, Link } from "react-router"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { findUserById } from "~/queries/user.server"
import type { Route } from "./+types/show"

export async function loader({ params }: Route.LoaderArgs) {
  const user = await findUserById(Number(params.id))

  if (!user) {
    throw data('User not found', { status: 404 })
  }

  return user
}

export default function Page({ loaderData: user }: Route.ComponentProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>User details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <dt className="font-semibold">ID</dt>
            <dd>{user.id}</dd>
            <dt className="font-semibold">Email</dt>
            <dd>{user.email}</dd>
            <dt className="font-semibold">Created At</dt>
            <dd>{String(user.created_at)}</dd>
            <dt>Actions</dt>
            <dd className="flex items-center gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/users/${user.id}/edit`}>Edit</Link>
              </Button>
              <Form action={`/users/${user.id}/delete`} method="delete">
                <Button type="submit" size="sm">
                  Delete
                </Button>
              </Form>
            </dd>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}