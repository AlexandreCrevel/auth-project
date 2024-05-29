import { UserType } from '@/schemas/auth';
import { ColumnDef } from '@tanstack/react-table';
import { FunctionsCells, RoleSelect } from './CustomCells';

export const createColumns = (
  handleRoleChange: (id: string, newRole: string) => void,
  handleDeleteUser: (id: string) => void
): ColumnDef<UserType>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
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
