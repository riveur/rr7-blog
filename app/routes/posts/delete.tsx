import { data, redirect } from "react-router";

import { deletePost, findPostById } from "~/queries/post.server";
import { Route } from "./+types/delete";

export async function action({ params }: Route.ActionArgs) {
  const post = await findPostById(Number(params.id))

  if (!post) {
    return data('Post not found', { status: 404 })
  }

  await deletePost(Number(params.id))
  return redirect('/posts');
}