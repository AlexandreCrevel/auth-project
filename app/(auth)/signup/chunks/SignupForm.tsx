'use client';
import { signUpNewUser } from '@/app/actions/auth';
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
import { signUpSchema, type SignUpSchemaType } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SignupForm = () => {
  const router = useRouter();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    const result = await signUpNewUser(data);
    if (result.error) {
      toast.error(result.error);
    } else {
      router.push('/signin');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
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

export default SignupForm;
