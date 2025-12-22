import DataTable, { Column } from "@/components/ui/Table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function TableUsageExample() {
  const data: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@mail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      role: "User",
    },
  ];

  const columns: Column<User>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "email", label: "Email", sortable: true },

    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Edit ${row.name}`)}
            className="text-primary"
          >
            Edit
          </button>
          <button
            onClick={() => alert(`Delete ${row.name}`)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return <DataTable title="Recent Transaction(s)" columns={columns} data={data} searchable />;
}
