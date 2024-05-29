import { UserType } from '@/schemas/auth';
import { ColumnDef } from '@tanstack/react-table';
import { RoleSelect } from './CustomCells';

export const columns: ColumnDef<UserType>[] = [
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
      <RoleSelect id={row.original.id.toString()} role={row.original.role} />
    ),
  },
];
