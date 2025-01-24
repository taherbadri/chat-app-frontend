'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import Link from 'next/link';
import Image from 'next/image';
import auth from '@/assets/auth.jpg';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Loader2 } from 'lucide-react';
import { login } from '@/lib/features/authentication/authenticationSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/schemas/authenticationSchema';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm({ className, ...props }) {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const { isLoading, user, isLoggedOut } = useAppSelector(
		(state) => state.authentication
	);
	const dispatch = useAppDispatch();

	const onSubmit = (data) => {
		dispatch(login(data));
	};

	useEffect(() => {
		if (isLoggedOut) return;
		if (user) return router.push('/chat');
	}, [user, isLoggedOut, router]);

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="overflow-hidden">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">Welcome back</h1>
									<p className="text-balance text-muted-foreground">
										Login to your Live Chat account
									</p>
								</div>
								<FormField
									name="email"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="abc@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="password"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex items-center">
												<p>Password</p>{' '}
												<a
													href="#"
													className="ml-auto text-sm underline-offset-2 hover:underline"
												>
													Forgot your password?
												</a>
											</FormLabel>
											<FormControl>
												<Input type="password" autoComplete="on" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{isLoading ? (
									<Button disabled>
										<Loader2 className="animate-spin" />
										Logging in
									</Button>
								) : (
									<Button type="submit" className="w-full">
										Login
									</Button>
								)}

								<div className="text-center text-sm">
									Don&apos;t have an account?{' '}
									<Link
										href="/sign-up"
										className="underline underline-offset-4"
									>
										Sign up
									</Link>
								</div>
							</div>
						</form>
					</Form>
					<div className="relative hidden bg-muted md:block">
						<Image
							src={auth}
							alt="Image"
							fill
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
