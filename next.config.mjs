/** @type {import('next').NextConfig} */
const nextConfig = {
	// images: { unoptimized: true },
	// output: 'export',
	// // Optional: Add a trailing slash to URLs
	// trailingSlash: true,
	// // Optional: Specify a custom output directory
	// distDir: 'out',
	async rewrites() {
		return [
			{
				source: '/api/:path*', // API endpoint on your frontend
				destination: 'https://chat-app-backend-dx99.onrender.com/api/:path*', // Backend URL
			},
		];
	},
};

export default nextConfig;
