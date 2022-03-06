import { ButtonPrimary, ButtonSecondary } from '../../components';

const Testing = () => {
	return (
		<div
			style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<ButtonPrimary onClick={() => {}} disabled={true}>
				Search!
			</ButtonPrimary>
			<ButtonPrimary onClick={() => {}} disabled={false}>
				Button1
			</ButtonPrimary>
			<ButtonSecondary onClick={() => {}} disabled={false}>
				Click me!
			</ButtonSecondary>
			<ButtonSecondary onClick={() => {}} disabled={true}>
				Click me!
			</ButtonSecondary>
		</div>
	);
};

export default Testing;
