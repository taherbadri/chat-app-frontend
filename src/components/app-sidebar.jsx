'use client';

import * as React from 'react';
import {
	ArchiveX,
	Command,
	File,
	MessageCircle,
	Send,
	Trash2,
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
import { Switch } from '@/components/ui/switch';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getChats, setSelectedChat } from '@/lib/features/chat/chatSlice';

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
	const { chats, selectedChat } = useAppSelector((state) => state.chat);
	const { user } = useAppSelector((state) => state.authentication);
	const { setOpen } = useSidebar();
	const [activeItem, setActiveItem] = React.useState(navItems[0]);

	React.useEffect(() => {
		dispatch(getChats());
	}, []);

	return (
		<Sidebar
			collapsible="icon"
			className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
			{...props}
		>
			<Sidebar
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
			</Sidebar>
			<Sidebar collapsible="none" className="hidden flex-1 md:flex">
				<SidebarHeader className="gap-3.5 border-b p-4">
					<div className="flex w-full items-center justify-between">
						<div className="text-base font-medium text-foreground">
							{activeItem.title}
						</div>
					</div>
					<SidebarInput placeholder="Search chats..." />
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup className="px-0">
						<SidebarGroupContent>
							{chats.map((chat) => (
								<a
									href="#"
									key={chat._id}
									className={`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
										chat._id === selectedChat ? 'bg-sidebar-accent' : ''
									}`}
									onClick={() => dispatch(setSelectedChat(chat._id))}
								>
									<div className="flex w-full items-center gap-2">
										<span>
											{chat.participants[0].username === user?.username
												? chat.participants[1].username
												: chat.participants[0].username}
										</span>
										<span className="ml-auto text-xs">
											{new Date(chat.updatedAt).toLocaleTimeString()}
										</span>
									</div>
									<span className="font-medium">
										Chat with{' '}
										{chat.participants[0].username === user?.username
											? chat.participants[1].username
											: chat.participants[0].username}
									</span>
									<span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
										{chat.lastMessage
											? chat.lastMessage.content
											: 'No messages yet'}
									</span>
								</a>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</Sidebar>
	);
}
