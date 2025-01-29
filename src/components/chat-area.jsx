import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, CheckCheck, ChevronDown } from 'lucide-react';
import InputArea from './input-area';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import io from 'socket.io-client';

import {
	getMessages,
	markChatAsRead,
	markMessageAsRead,
	receiveMessage,
} from '@/lib/features/chat/chatSlice';

// const socket = io('http://localhost:5000', {
// 	withCredentials: true,
// }); // Initialize socket connection
const socket = io('https://chat-app-backend-dx99.onrender.com', {
	withCredentials: true,
}); // Initialize socket connection

export function ChatArea() {
	const { selectedChat, messages } = useAppSelector((state) => state.chat);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((store) => store.authentication);

	const messagesEndRef = useRef(null);
	const scrollAreaRef = useRef(null);
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [isNearBottom, setIsNearBottom] = useState(true);

	const scrollToBottom = (behavior) => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior });
		}
	};

	const handleScroll = () => {
		if (scrollAreaRef.current) {
			const { scrollHeight, scrollTop, clientHeight } = scrollAreaRef.current;
			const bottomThreshold = 100; // pixels from bottom
			const isNear = scrollHeight - scrollTop - clientHeight < bottomThreshold;
			setIsNearBottom(isNear);
			setShowScrollButton(!isNear);
		}
	};

	useEffect(() => {
		if (selectedChat) {
			dispatch(getMessages(selectedChat));
			socket.emit('joinChat', selectedChat);
		}

		socket.on('newMessage', (message) => {
			console.log(`file: chat-area.jsx:57 - socket.on - message:`, message);
			dispatch(receiveMessage(message));
			console.log(
				`file: chat-area.jsx:58 - socket.on - selectedChat === message.chat:`,
				selectedChat === message.chat && message.sender._id !== user.userId
			);
			if (selectedChat === message.chat && message.sender._id !== user.userId) {
				dispatch(markChatAsRead(message._id));
			}
		});

		socket.on('messageRead', (message) => {
			console.log(
				`file: chat-area.jsx:65 - socket.on - message was read:`,
				message
			);
			dispatch(markMessageAsRead(message.messageId));
		});

		return () => {
			socket.off('newMessage');
			socket.off('messageRead');
		};
	}, [selectedChat, dispatch]);

	useEffect(() => {
		if (isNearBottom) {
			scrollToBottom();
		} else {
			setShowScrollButton(true);
		}
	}, [messages, isNearBottom]);

	useEffect(() => {
		scrollToBottom('auto');
	}, [selectedChat]);

	if (!selectedChat) {
		return (
			<div className="flex-grow flex items-center justify-center bg-muted">
				<p className="text-muted-foreground">
					Select a chat to start messaging
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)] relative">
			<ScrollArea
				className="flex-grow p-4"
				onScrollCapture={handleScroll}
				ref={scrollAreaRef}
			>
				<div className="space-y-4">
					{messages.map((message) => (
						<div
							key={message._id}
							className={`flex my-1 gap-1 ${
								message.sender.username === user?.username
									? 'justify-end'
									: 'justify-start'
							}`}
						>
							<div
								className={`flex ${
									message.sender.username === user?.username
										? 'flex-row-reverse'
										: 'flex-row'
								} items-end space-x-2 my-1 gap-1`}
							>
								<Avatar className="w-8 h-8">
									<AvatarImage
										src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender.username}`}
									/>
									<AvatarFallback>{message.sender.username[0]}</AvatarFallback>
								</Avatar>
								<div
									className={`rounded-lg p-3 max-w-md ${
										message.sender.username === user?.username
											? 'bg-primary text-primary-foreground'
											: 'bg-muted'
									}`}
								>
									<p>{message.content}</p>
									<div className="flex items-center justify-between gap-4">
										<p className="text-xs text-muted-foreground mt-1">
											{new Date(message.createdAt).toLocaleTimeString()}
										</p>
										{user.userId === message.sender._id ? (
											message.isRead ? (
												<CheckCheck className="h-4 w-4 ml-4 text-cyan-300" />
											) : (
												<CheckCheck className="h-4 w-4 ml-4" />
											)
										) : null}
									</div>
								</div>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			</ScrollArea>

			{showScrollButton && (
				<Button
					size="icon"
					variant="secondary"
					className="absolute bottom-20 right-4 rounded-full shadow-lg"
					onClick={() => scrollToBottom()}
				>
					<ChevronDown className="h-4 w-4" />
				</Button>
			)}

			<InputArea />
		</div>
	);
}
