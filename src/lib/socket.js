import io from 'socket.io-client';

let socket;

export const initializeSocket = () => {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000,
			transports: ['websocket', 'polling'],
		});

		socket.on('connect', () => {
			console.log('Socket connected successfully');
		});

		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error);
		});

		socket.on('disconnect', (reason) => {
			console.log('Socket disconnected:', reason);
			if (reason === 'io server disconnect') {
				// the disconnection was initiated by the server, you need to reconnect manually
				socket.connect();
			}
		});
	}
	return socket;
};

export const getSocket = () => {
	if (!socket) {
		return initializeSocket();
	}
	return socket;
};
