'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInSchema, type SignInSchemaType } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SigninForm = () => {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    const result = await signIn('credentials', {
      redirect: true,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Login successful');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='user@mail.com' {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='********' {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full mt-4'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
