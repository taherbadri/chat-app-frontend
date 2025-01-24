import { z } from 'zod';

export const registerSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(20, { message: 'Password must be at most 20 characters' })
			.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
				message:
					'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
			}),
		confirmPassword: z
			.string()
			.min(6, { message: 'Confirm Password is required' }),
		username: z
			.string()
			.min(3, { message: 'Username must be at least 3 characters' }),
	})
	.refine(
		({ password, confirmPassword }) => {
			return password === confirmPassword;
		},
		{
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		}
	);

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
});
