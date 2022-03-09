import { Footer, Header } from '../components';
import { LayoutI } from './interfaces';

const Layout = ({ children }: LayoutI) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
