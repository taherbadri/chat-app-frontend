'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Sidebar } from './sidebar';
import { ChatArea } from './chat-area';
import { InputArea } from './input-area';

import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
	getChats,
	getMessages,
	receiveMessage,
	markMessageAsRead,
} from '@/lib/features/chat/chatSlice';

const socket = io('http://localhost:5000'); // Initialize socket connection

export function ChatInterface() {
	const dispatch = useAppDispatch();
	const { chats, selectedChat, messages, isLoading } = useAppSelector(
		(state) => state.chat
	);

	useEffect(() => {
		dispatch(getChats());
	}, [dispatch]);

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

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex h-full">
			<Sidebar chats={chats} />
			<div className="flex flex-col flex-grow">
				<ChatArea selectedChat={selectedChat} messages={messages} />
				<InputArea selectedChat={selectedChat} />
			</div>
		</div>
	);
}
