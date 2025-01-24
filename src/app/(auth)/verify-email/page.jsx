'use client';

import { verifyEmail } from '@/lib/features/authentication/authenticationSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyEmailPage() {
	const email = useSearchParams().get('email');
	const verificationToken = useSearchParams().get('verificationToken');
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (email && verificationToken) {
			dispatch(verifyEmail({ email, verificationToken }));
		}
		router.push('/login');
	}, [dispatch, email, verificationToken, router]);
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl"></div>
		</div>
	);
}
