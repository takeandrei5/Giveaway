import { Head, Html, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => {
	return (
		<Html>
			<Head lang='en'>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
