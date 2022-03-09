import { ButtonPrimary, ButtonSecondary, Typography } from '../../components';

const Testing = () => {
	return (
		<div
			style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
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

			<div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
				<Typography variant='h1'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='h3'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='h5'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='default'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='input'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='button'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='paragraph'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='caption'>The quick brown fox jumps over the lazy dog</Typography>
				<Typography variant='small'>The quick brown fox jumps over the lazy dog</Typography>
			</div>
		</div>
	);
};

export default Testing;
