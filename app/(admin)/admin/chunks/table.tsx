'use client';
import { changeUserRole, deleteUser, getAllUsers } from '@/app/actions/admin';
import { Button } from '@/components/ui/button';
import { UserType } from '@/schemas/auth';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { createColumns } from './TableHeader';

const AdminTable = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setData(users);
    };
    fetchData();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    const updatedUser = await changeUserRole(id, newRole);
    if (updatedUser) {
      setData((prevData) =>
        prevData.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
      toast.success(`${updatedUser.name} role changed to ${newRole}`);
    } else {
      toast.error(`Failed to change user ${id} role`);
    }
  };

  const handleDeleteUser = async (id: string) => {
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      setData((prevData) => prevData.filter((user) => user.id !== id));
      toast.success(`${id} has been deleted`);
    } else {
      toast.error(`Failed to delete user ${id}`);
    }
  };

  const columns = createColumns(handleRoleChange, handleDeleteUser);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className='w-full'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='border-b text-left'>
                {header.isPlaceholder ? null : (
                  <Button
                    variant={'ghost'}
                    className='w-full justify-start'
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <ArrowDownAZ size={16} />,
                      desc: <ArrowUpZA size={16} />,
                    }[header.column.getIsSorted() as string] || ''}
                  </Button>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='px-4'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
