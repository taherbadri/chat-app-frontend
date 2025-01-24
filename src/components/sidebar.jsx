import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { setSelectedChat } from '@/lib/features/chat/chatSlice';
import { useAppSelector } from '@/lib/hooks';
import { logout } from '@/lib/features/authentication/authenticationSlice';
import { useRouter } from 'next/navigation';

export function Sidebar({ chats }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const { user } = useAppSelector((state) => state.authentication);

	const handleSelectChat = (chatId) => {
		dispatch(setSelectedChat(chatId));
	};

	const handleLogout = async () => {
		dispatch(logout());
		await new Promise((resolve) => setTimeout(resolve, 1000));
		router.push('/login');
	};

	return (
		<div className="w-80 border-r flex flex-col items-center justify-between py-2">
			<div className="p-4 border-b">
				<div className="relative">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<input
						placeholder="Search or start new chat"
						className="pl-8 pr-4 py-2 w-full rounded-md border"
					/>
				</div>
			</div>
			<ScrollArea className="h-[calc(100vh-5rem)]">
				{chats?.map((chat) => (
					<Button
						key={chat._id}
						variant="ghost"
						className="w-full justify-start px-4 py-6 space-x-4"
						onClick={() => handleSelectChat(chat._id)}
					>
						<Avatar>
							<AvatarImage
								src={`https://api.dicebear.com/6.x/initials/svg?seed=${
									chat.participants[0].username === user?.username
										? chat.participants[1].username
										: chat.participants[0].username
								}`}
							/>
							<AvatarFallback>
								{chat.participants[0].username === user?.username
									? chat.participants[1].username
											.split(' ')
											.map((n) => n[0])
											.join('')
									: chat.participants[0].username
											.split(' ')
											.map((n) => n[0])
											.join('')}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col items-start">
							<span className="font-semibold capitalize">
								{chat.participants[0].username === user?.username
									? chat.participants[1].username
									: chat.participants[0].username}
							</span>
							<span className="text-sm text-muted-foreground">
								{chat.lastMessage
									? chat.lastMessage.content.length > 30
										? chat.lastMessage.content.slice(0, 30) + '...'
										: chat.lastMessage.content
									: 'No messages yet'}
							</span>
						</div>
					</Button>
				))}
			</ScrollArea>
			<div className="p-4 w-full border-t ">
				<Button
					variant="destructive"
					className="w-full"
					onClick={() => {
						handleLogout();
					}}
				>
					Exit
				</Button>
			</div>
		</div>
	);
}
