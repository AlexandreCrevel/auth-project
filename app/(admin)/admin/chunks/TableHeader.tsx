import { UserType } from '@/schemas/auth';
import { ColumnDef } from '@tanstack/react-table';
import { EditableCell, FunctionsCells, RoleSelect } from './CustomCells';

export const createColumns = (
  handleRoleChange: (id: string, newRole: string) => void,
  handleDeleteUser: (id: string) => void,
  handleSave: (id: string, newValue: string, field: string) => void
): ColumnDef<UserType>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <EditableCell
        id={row.original.id.toString()}
        value={row.original.name}
        field='name'
        onSave={handleSave}
      />
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <EditableCell
        id={row.original.id.toString()}
        value={row.original.email}
        field='email'
        onSave={handleSave}
      />
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <RoleSelect
        id={row.original.id.toString()}
        role={row.original.role}
        onChangeRole={handleRoleChange}
      />
    ),
  },
  {
    header: ' ',
    cell: (info) => (
      <FunctionsCells
        rowID={info.row.original.id.toString()}
        onDelete={handleDeleteUser}
      />
    ),
    enableSorting: false,
  },
];
