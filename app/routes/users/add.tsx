import { data, Form, redirect, useFetcher } from "react-router"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { formatZodError } from "~/lib/validation"
import { createUser } from "~/queries/user.server"
import type { Route } from "./+types/add"

const schema = z.object({
  email: z.string().email(),
})

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  try {
    const payload = schema.parse(Object.fromEntries(formData));
    // const password = await hashPassword('password');
    const password = 'password';
    await createUser({ ...payload, password });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return data({ errors: formatZodError(error) }, { status: 422 });
    }
  }

  return redirect('/users');
}

export default function Page({ }: Route.ComponentProps) {
  const fetcher = useFetcher()

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add new user</CardTitle>
        </CardHeader>
        <fetcher.Form method="post">
          <CardContent>
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email
              </Label>
              <Input id="email" type="email" name="email" />
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