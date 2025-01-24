'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import auth from '@/assets/auth.jpg';
import Image from 'next/image';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/schemas/authenticationSchema';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { register } from '@/lib/features/authentication/authenticationSlice';
import { Loader2 } from 'lucide-react';

export function SignUpForm({ className, ...props }) {
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			password: '',
			username: '',
			confirmPassword: '',
		},
	});
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.authentication);

	const onSubmit = (data) => {
		console.log(`file: signup-form.jsx:27 - onSubmit - data:`, data);
		dispatch(register(data));
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="overflow-hidden">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center text-center">
									<h1 className="text-2xl font-bold">Welcome</h1>
									<p className="text-balance text-muted-foreground">
										Sign up to start a Live Chat
									</p>
								</div>
								<FormField
									name="username"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="johndoe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type="password" autoComplete="on" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="confirmPassword"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
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
										Signing up
									</Button>
								) : (
									<Button type="submit" className="w-full">
										Sign up
									</Button>
								)}

								<div className="text-center text-sm">
									Already a user?{' '}
									<Link href="/login" className="underline underline-offset-4">
										Login
									</Link>
								</div>
							</div>
						</form>
					</Form>
					<div className="relative hidden bg-muted md:block">
						<Image
							src={auth}
							fill
							alt="Image"
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
