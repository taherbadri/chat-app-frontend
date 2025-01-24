'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ChatArea } from '@/components/chat-area';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { showMe } from '@/lib/features/authentication/authenticationSlice';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isLoggedOut, isLoading, user } = useAppSelector(
		(state) => state.authentication
	);

	useEffect(() => {
		dispatch(showMe());
	}, [dispatch]);

	useEffect(() => {
		if (isLoggedOut && !user) return router.push('/login');
	}, [isLoggedOut, user, router]);

	return (
		<SidebarProvider
			style={{
				'--sidebar-width': '350px',
			}}
		>
			<AppSidebar />
			<SidebarInset>
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">All Chats</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Current Chat</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<ChatArea />
			</SidebarInset>
		</SidebarProvider>
	);
}
