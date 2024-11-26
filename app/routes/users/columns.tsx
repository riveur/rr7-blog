import type { ColumnDef } from "@tanstack/react-table"
import { Edit2Icon, Trash2Icon } from "lucide-react"
import { Form, Link } from "react-router"

import { Button } from "~/components/ui/button"
import type { User } from "~/types"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "email",
    header: "Email",
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
            <Link to={`/users/${row.original.id}/edit`}>
              <Edit2Icon className="size-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Form action={`/users/${row.original.id}/delete`} method="delete">
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
