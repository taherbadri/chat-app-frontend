import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { sendMessage } from '@/lib/features/chat/chatSlice';

export function InputArea() {
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const selectedChat = useSelector((state) => state.chat.selectedChat);

	const handleSendMessage = () => {
		if (message.trim() && selectedChat) {
			dispatch(sendMessage({ chatId: selectedChat, content: message }));
			setMessage('');
		}
	};

	return (
		<div className="p-4 border-t flex items-center space-x-2">
			<Input
				placeholder="Type a message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
				disabled={!selectedChat}
			/>
			<Button
				onClick={handleSendMessage}
				disabled={!selectedChat || !message.trim()}
			>
				<Send className="h-4 w-4" />
			</Button>
		</div>
	);
}
