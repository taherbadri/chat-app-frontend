import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { InputArea } from './input-area';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import io from 'socket.io-client';

import {
	getMessages,
	markMessageAsRead,
	receiveMessage,
} from '@/lib/features/chat/chatSlice';

const socket = io('http://localhost:5000'); // Initialize socket connection

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
			dispatch(receiveMessage(message));
		});

		socket.on('messageRead', (messageId) => {
			dispatch(markMessageAsRead(messageId));
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
									<p className="text-xs text-muted-foreground mt-1">
										{new Date(message.createdAt).toLocaleTimeString()}
									</p>
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