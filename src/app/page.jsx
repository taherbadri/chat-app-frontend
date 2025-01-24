import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<section className="flex gap-2 items-center">
				<Button asChild variant="secondary" className="rounded-full">
					<Link href={'/login'}>Login Page</Link>
				</Button>
			</section>
		</>
	);
}
