import type { ColumnDef } from "@tanstack/react-table"
import { Edit2Icon, Trash2Icon } from "lucide-react"
import { Form, Link } from "react-router"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import type { Post } from "~/types"

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Button variant="link" className="p-0 h-auto" asChild>
          <Link to={`/posts/${row.original.id}`}>{row.original.title}</Link>
        </Button>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge>
          {row.original.status.toUpperCase()}
        </Badge>
      )
    }
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button className="size-8" variant="outline" asChild>
            <Link to={`/posts/${row.original.id}/edit`}>
              <Edit2Icon className="size-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Form action={`/posts/${row.original.id}/delete`} method="delete">
            <Button type="submit" className="size-8">
              <Trash2Icon className="size-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </Form>
        </div>
      )
    }
  }
]
