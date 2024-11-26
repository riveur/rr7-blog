import { data, redirect, useFetcher } from "react-router"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { formatZodError } from "~/lib/validation"
import { findUserById, updateUser } from "~/queries/user.server"
import type { Route } from "./+types/edit"

const schema = z.object({
  email: z.string().email(),
})

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData()

  try {
    const payload = schema.parse(Object.fromEntries(formData));
    await updateUser(Number(params.id), payload);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return data({ errors: formatZodError(error) }, { status: 422 });
    }
  }

  return redirect('/users');
}

export async function loader({ params }: Route.LoaderArgs) {
  const user = await findUserById(Number(params.id))

  if (!user) {
    throw data('User not found', { status: 404 })
  }

  return user
}

export default function Page({ loaderData: user }: Route.ComponentProps) {
  const fetcher = useFetcher()

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit user #{user.id}</CardTitle>
        </CardHeader>
        <fetcher.Form method="post">
          <CardContent>
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email
              </Label>
              <Input id="email" type="email" name="email" defaultValue={user.email} />
              {fetcher.data?.errors?.email && (<div className="text-sm text-destructive">{fetcher.data.errors.email}</div>)}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={fetcher.state !== 'idle'}>
              Save
            </Button>
          </CardFooter>
        </fetcher.Form>
      </Card>
    </div>
  )
}