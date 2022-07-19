import { useState } from 'react';

const useFooterMessage = () => {
	const [message, setMessage] = useState<string>('');

	const onEnterKeyPressCallback = (message: string): void => {
		if (!message.length) {
			return;
		}

		setMessage('');

		alert(message);
	};

	const onKeyDownCallback = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			onEnterKeyPressCallback(message);
			e.preventDefault();
		}
	};

	const onChangeCallback = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setMessage(e.target.value);
	};

	return { message, onKeyDownCallback, onChangeCallback };
};

export { useFooterMessage };
