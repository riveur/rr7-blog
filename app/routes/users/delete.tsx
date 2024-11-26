import { data, redirect } from "react-router";

import { deleteUser, findUserById } from "~/queries/user.server";
import { Route } from "./+types/delete";

export async function action({ params }: Route.ActionArgs) {
  const user = await findUserById(Number(params.id))

  if (!user) {
    return data('User not found', { status: 404 })
  }

  await deleteUser(Number(params.id))
  return redirect('/users');
}