import { Link } from "react-router"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { findUser } from "~/queries/user.server"
import type { Route } from "./+types/index"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export async function loader() {
  const users = await findUser({})
  return users
}

export default function Page({ loaderData: users }: Route.ComponentProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle>Users</CardTitle>
          <CardDescription>List of users</CardDescription>
        </div>
        <Button asChild>
          <Link to="/users/add">
            Add user
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={users} />
      </CardContent>
    </Card>
  )
}