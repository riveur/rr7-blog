import { findUserById } from "~/queries/user.server"
import type { Route } from "./+types/show"

export async function loader({ params }: Route.LoaderArgs) {
  const user = await findUserById(Number(params.id))
  return user
}

export default function Page({ loaderData: user }: Route.ComponentProps) {
  return (
    <div>
      <h1>User</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}