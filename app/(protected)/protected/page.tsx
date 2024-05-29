'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const Protected = () => {
  return (
    <div>
      Protected
      <Button onClick={async () => await signOut()}>Click</Button>
    </div>
  );
};

export default Protected;
