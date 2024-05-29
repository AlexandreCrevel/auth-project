import Link from 'next/link';
import AdminTable from './chunks/AdminTable';

const Admin = async () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center flex-col gap-8'>
      <AdminTable />
      <Link href='/protected'>Go back to Protected Page</Link>
    </div>
  );
};

export default Admin;
