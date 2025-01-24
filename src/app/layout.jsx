import localFont from 'next/font/local';
import './globals.css';
import StoreProvider from './StoreProvider';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/theme-provider';
import { ScrollArea } from '@/components/ui/scroll-area';
const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata = {
	title: 'Employee Chat App',
	description: 'Chat with your fellow colleagues',
};

export default function RootLayout({ children }) {
	return (
		<StoreProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 `}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster position={'top-right'} richColors />
					</ThemeProvider>
				</body>
			</html>
		</StoreProvider>
	);
}
