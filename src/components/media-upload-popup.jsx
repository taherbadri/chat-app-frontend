import { Button } from '@/components/ui/button';
import { Image, File, Music, Video } from 'lucide-react';

const MediaUploadPopup = ({ onClose, onUpload }) => {
	return (
		<div className="absolute bottom-full mb-2 right-0 bg-white shadow-lg rounded-md p-2">
			<div className="flex flex-col space-y-2">
				<Button variant="ghost" onClick={() => onUpload('image')}>
					<Image className="mr-2 h-4 w-4" />
					Image
				</Button>
				<Button variant="ghost" onClick={() => onUpload('file')}>
					<File className="mr-2 h-4 w-4" />
					File
				</Button>
				<Button variant="ghost" onClick={() => onUpload('audio')}>
					<Music className="mr-2 h-4 w-4" />
					Audio
				</Button>
				<Button variant="ghost" onClick={() => onUpload('video')}>
					<Video className="mr-2 h-4 w-4" />
					Video
				</Button>
			</div>
		</div>
	);
};

export default MediaUploadPopup;
