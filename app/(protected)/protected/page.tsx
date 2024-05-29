import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Protected = async () => {
  const session = await auth();
  return (
    <div className='flex h-screen w-screen items-center justify-center flex-col'>
      Welcome {session?.user?.name}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit'>Disconnect</Button>
      </form>
      <Link href='/admin'>Go to Admin Panel</Link>
    </div>
  );
};

export default Protected;
