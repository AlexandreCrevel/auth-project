import { getAllUsers } from '@/app/actions/admin';
import Link from 'next/link';
import AdminTable from './chunks/table';

const Admin = async () => {
  const users = await getAllUsers();
  return (
    <div className='flex h-screen w-screen items-center justify-center flex-col gap-8'>
      <AdminTable data={users} />
      <Link href='/protected'>Go back to Protected Page</Link>
    </div>
  );
};

export default Admin;
