import { EditorContent, useEditor } from "@tiptap/react"
import { useState } from "react"
import { data, redirect, useFetcher } from "react-router"
import { z } from "zod"

import { BlockquoteToolbar } from "~/components/toolbars/blockquote"
import { BoldToolbar } from "~/components/toolbars/bold"
import { BulletListToolbar } from "~/components/toolbars/bullet-list"
import { CodeToolbar } from "~/components/toolbars/code"
import { CodeBlockToolbar } from "~/components/toolbars/code-block"
import { HardBreakToolbar } from "~/components/toolbars/hard-break"
import { HorizontalRuleToolbar } from "~/components/toolbars/horizontal-rule"
import { ItalicToolbar } from "~/components/toolbars/italic"
import { OrderedListToolbar } from "~/components/toolbars/ordered-list"
import { RedoToolbar } from "~/components/toolbars/redo"
import { StrikeThroughToolbar } from "~/components/toolbars/strikethrough"
import { ToolbarProvider } from "~/components/toolbars/toolbar-provider"
import { UndoToolbar } from "~/components/toolbars/undo"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Separator } from "~/components/ui/separator"
import { formatZodError } from "~/lib/validation"
import { createPost } from "~/queries/post.server"
import type { Route } from "./+types/add"
import { extensions } from "./editor"

const schema = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(['draft', 'published']),
})

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  try {
    const payload = schema.parse(Object.fromEntries(formData));
    await createPost({ ...payload, user_id: 1 });
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return data({ errors: formatZodError(error) }, { status: 422 });
    }
  }

  return redirect('/posts');
}

export default function Page({ }: Route.ComponentProps) {
  const [content, setContent] = useState('')

  const fetcher = useFetcher()
  const editor = useEditor({
    extensions: extensions,
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    }
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add new post</CardTitle>
        </CardHeader>
        <fetcher.Form method="post">
          <CardContent className="grid gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="title">
                Title
              </Label>
              <Input id="title" type="text" name="title" />
              {fetcher.data?.errors?.title && (<div className="text-sm text-destructive">{fetcher.data.errors.title}</div>)}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="status">
                Status
              </Label>
              <Select defaultValue="draft" name="status">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              {fetcher.data?.errors?.status && (<div className="text-sm text-destructive">{fetcher.data.errors.status}</div>)}
            </div>
            {editor && (
              <div className="space-y-1.5">
                <textarea id="content" name="content" className="hidden" value={content} />
                <div className="border w-full relative rounded-md overflow-hidden pb-3">
                  <div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
                    <ToolbarProvider editor={editor}>
                      <div className="flex items-center gap-2">
                        <UndoToolbar />
                        <RedoToolbar />
                        <Separator orientation="vertical" className="h-7" />
                        <BoldToolbar />
                        <ItalicToolbar />
                        <StrikeThroughToolbar />
                        <BulletListToolbar />
                        <OrderedListToolbar />
                        <CodeToolbar />
                        <CodeBlockToolbar />
                        <HorizontalRuleToolbar />
                        <BlockquoteToolbar />
                        <HardBreakToolbar />
                      </div>
                    </ToolbarProvider>
                  </div>
                  <div
                    onClick={() => {
                      editor?.chain().focus().run();
                    }}
                    className="cursor-text min-h-[18rem] bg-background"
                  >
                    <EditorContent className="outline-none" editor={editor} />
                  </div>
                </div>
              </div>
            )}
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