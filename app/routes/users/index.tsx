import { findUser } from "~/queries/user"
import type { Route } from "./+types/index"
import { Link } from "react-router"

export async function loader() {
  const users = await findUser({})
  return users
}

export default function Page({ loaderData: users }: Route.ComponentProps) {
  return (
    <div>
      <h1>Users</h1>
      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`} className="hover:underline">{user.email}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}