import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Smile, Paperclip } from 'lucide-react';
import { sendMessage } from '@/lib/features/chat/chatSlice';
import dynamic from 'next/dynamic';
import MediaUploadPopup from './media-upload-popup';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
});

const InputArea = () => {
	const [message, setMessage] = useState('');
	const [toggleEmoji, setToggleEmoji] = useState(false);
	const [toggleMediaUpload, setToggleMediaUpload] = useState(false);
	const dispatch = useDispatch();
	const selectedChat = useSelector((state) => state.chat.selectedChat);
	const emojiPickerRef = useRef(null);
	const mediaUploadRef = useRef(null);

	const handleSendMessage = useCallback(() => {
		if (message.trim() && selectedChat) {
			dispatch(sendMessage({ chatId: selectedChat, content: message }));
			setMessage('');
		}
	}, [message, selectedChat, dispatch]);

	const handleEmojiClick = useCallback((emojiObject) => {
		setMessage((prevMessage) => prevMessage + emojiObject.emoji);
		setToggleEmoji(false);
	}, []);

	const handleKeyPress = useCallback(
		(e) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				handleSendMessage();
			}
		},
		[handleSendMessage]
	);

	const handleClickOutside = useCallback((event) => {
		if (
			emojiPickerRef.current &&
			!emojiPickerRef.current.contains(event.target)
		) {
			setToggleEmoji(false);
		}
		if (
			mediaUploadRef.current &&
			!mediaUploadRef.current.contains(event.target)
		) {
			setToggleMediaUpload(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

	const handleMediaUpload = useCallback((type) => {
		// Implement media upload logic here
		console.log(`Uploading ${type}`);
		setToggleMediaUpload(false);
	}, []);

	return (
		<div className="p-4 border-t flex items-center space-x-2">
			<div className="relative" ref={emojiPickerRef}>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setToggleEmoji((prev) => !prev)}
					aria-label="Toggle emoji picker"
				>
					<Smile className="h-6 w-6" />
				</Button>
				{toggleEmoji && (
					<div className="absolute bottom-full mb-2">
						<EmojiPicker onEmojiClick={handleEmojiClick} />
					</div>
				)}
			</div>

			<Input
				placeholder="Type a message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyPress={handleKeyPress}
				disabled={!selectedChat}
				className="flex-grow"
			/>
			<div className="relative" ref={mediaUploadRef}>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setToggleMediaUpload((prev) => !prev)}
					aria-label="Upload media"
				>
					<Paperclip className="h-6 w-6" />
				</Button>
				{toggleMediaUpload && (
					<MediaUploadPopup
						onClose={() => setToggleMediaUpload(false)}
						onUpload={handleMediaUpload}
					/>
				)}
			</div>
			<Button
				onClick={handleSendMessage}
				disabled={!selectedChat || !message.trim()}
				size="icon"
			>
				<Send className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default React.memo(InputArea);
