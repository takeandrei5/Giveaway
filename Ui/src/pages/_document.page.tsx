import { Head, Html, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => (
	<Html>
		<Head lang='en'>
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' />
			<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap' />
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default Document;
