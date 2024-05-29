import Link from 'next/link';

const Admin = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Link href='/protected'>Go back to Protected Page</Link>
    </div>
  );
};

export default Admin;
