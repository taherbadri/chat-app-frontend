'use client';

import * as React from 'react';
import {
	ArchiveX,
	Command,
	Edit,
	File,
	MessageCircle,
	Send,
	Settings,
	Settings2,
	Trash2,
	Volume,
} from 'lucide-react';

import { NavUser } from '@/components/nav-user';
import { Label } from '@/components/ui/label';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getChats, setSelectedChat } from '@/lib/features/chat/chatSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StatusOptionsPopover from './status-options-poover';

const navItems = [
	{
		title: 'Chats',
		icon: MessageCircle,
		isActive: true,
	},
	{
		title: 'Drafts',
		icon: File,
		isActive: false,
	},
	{
		title: 'Sent',
		icon: Send,
		isActive: false,
	},
	{
		title: 'Archived',
		icon: ArchiveX,
		isActive: false,
	},
	{
		title: 'Trash',
		icon: Trash2,
		isActive: false,
	},
];

export function AppSidebar({ ...props }) {
	const dispatch = useAppDispatch();
	const [status, setStatus] = React.useState('Available');
	const { chats, selectedChat } = useAppSelector((state) => state.chat);
	const { user } = useAppSelector((state) => state.authentication);
	const { setOpen } = useSidebar();
	const [activeItem, setActiveItem] = React.useState(navItems[0]);

	React.useEffect(() => {
		dispatch(getChats());
	}, [dispatch]); // Added dispatch to dependencies

	const handleStatusChange = (newStatus) => {
		setStatus(newStatus);
		// You might want to update this in your global state or send it to a server
		console.log(`Status changed to: ${newStatus}`);
	};

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
			{...props}
		>
			{/* <Sidebar
				collapsible="none"
				className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
			>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
								<a href="#">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<Command className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">Live Chat</span>
									</div>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent className="px-1.5 md:px-0">
							<SidebarMenu>
								{navItems.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											tooltip={{
												children: item.title,
												hidden: false,
											}}
											onClick={() => {
												setActiveItem(item);
												setOpen(true);
											}}
											isActive={activeItem.title === item.title}
											className="px-2.5 md:px-2"
										>
											<item.icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<NavUser
						user={{
							name: user?.username,
							email: user?.email,
						}}
					/>
				</SidebarFooter>
			</Sidebar> */}

			<Sidebar collapsible="none" className="hidden flex-1 md:flex">
				<SidebarHeader className="gap-3.5 border-b p-4">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<Avatar className="h-16 w-16">
								<AvatarImage src={user?.avatarUrl} alt={user?.username} />
								<AvatarFallback>
									{user?.username.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="font-medium truncate">{user?.username}</span>
								<span className="text-xs text-muted-foreground">{status}</span>
							</div>
						</div>
						<div className="flex gap-2 items-center">
							<StatusOptionsPopover
								onStatusChange={handleStatusChange}
								currentStatus={status}
							/>
							<Settings2 className="w-5 h-5" />
						</div>
					</div>
					<SidebarInput placeholder="Search chats..." />
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup className="px-0">
						<SidebarGroupContent>
							{chats.map((chat) => {
								const otherUser = chat.participants.find(
									(p) => p.username !== user?.username
								);
								return (
									<a
										href="#"
										key={chat._id}
										className={`flex items-center gap-4 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
											chat._id === selectedChat ? 'bg-sidebar-accent' : ''
										}`}
										onClick={() => dispatch(setSelectedChat(chat._id))}
									>
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
										<div className="flex flex-col flex-grow min-w-0">
											<div className="flex items-center justify-between w-full">
												<span className="font-medium truncate">
													{otherUser?.username}
												</span>
												<span className="text-xs text-muted-foreground">
													{new Date(chat.updatedAt).toLocaleTimeString()}
												</span>
											</div>
											<span className="line-clamp-1 text-xs text-muted-foreground">
												{chat.lastMessage
													? chat.lastMessage.content
													: 'No messages yet'}
											</span>
										</div>
									</a>
								);
							})}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</Sidebar>
	);
}
