import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, Edit } from 'lucide-react';

const StatusOptionsPopover = ({ onStatusChange, currentStatus }) => {
	const statuses = ['Available', 'Busy', 'Not Available'];

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<Edit className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-48">
				<div className="space-y-2">
					{statuses.map((status) => (
						<Button
							key={status}
							variant="ghost"
							className="w-full justify-start"
							onClick={() => onStatusChange(status)}
						>
							{status}
							{currentStatus === status && (
								<Check className="ml-auto h-4 w-4" />
							)}
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default StatusOptionsPopover;
