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
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { showMe } from '@/lib/features/authentication/authenticationSlice';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ChatPage() {
	const dispatch = useAppDispatch();
	const { selectedChatUser } = useAppSelector((state) => state.chat);
	const [otherUser, setOtherUser] = useState(null);
	const router = useRouter();
	const { isLoggedOut, isLoading, user } = useAppSelector(
		(state) => state.authentication
	);
	useEffect(() => {
		if (selectedChatUser) {
			selectedChatUser?.participants.forEach((participant) => {
				if (participant?._id !== user?.userId) {
					setOtherUser(participant);
				}
			});
		}
	}, [selectedChatUser, user?.userId]);

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
				<header className="sticky min-h-20 top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
					{selectedChatUser && (
						<>
							<div className="relative">
								<Avatar className="h-10 w-10">
									<AvatarImage
										src={otherUser?.avatarUrl}
										alt={otherUser?.username}
									/>
									<AvatarFallback>
										{otherUser?.username.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<span
									className={`absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
										otherUser?.isOnline ? 'bg-green-500' : 'bg-gray-300'
									}`}
								/>
							</div>
							<div className="flex flex-col flex-grow min-w-0 ml-2">
								<div className="flex items-center justify-between w-full">
									<span className="font-medium truncate">
										{otherUser?.username}
									</span>
								</div>
							</div>
						</>
					)}
				</header>
				<ChatArea />
			</SidebarInset>
		</SidebarProvider>
	);
}
