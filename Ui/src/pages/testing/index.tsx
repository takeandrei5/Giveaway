import { NextPageContext } from 'next';

import { ButtonPrimary, CategoryItem, ListingItem, Typography } from '../../components';

const Testing = ({ listings }: any) => {
	console.log(listings);

	return (
		<>
			<div
				style={{
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
					<ButtonPrimary onClick={() => {}} disabled={true}>
						Search!
					</ButtonPrimary>
					<ButtonPrimary onClick={() => {}} disabled={false}>
						Button1
					</ButtonPrimary>
				</div>

				<div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
					<Typography variant='h1' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='h3' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='h5' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='default' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='input' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='button' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='paragraph' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='caption' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
					<Typography variant='small' multiline>
						The quick brown fox jumps over the lazy dog
					</Typography>
				</div>

				<div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
					{/* <Formik
						initialValues={{
							firstName: '',
							lastName: '',
							email: '',
						}}
						onSubmit={() => {}}
						children={(props) => {
							return (
								<>
									<Input id='test1' name='test1n' placeholder={'This is a normal input'} />
									<Input
										id='test2'
										name='test2n'
										disabled
										placeholder={'This is a disabled input'}
									/>
									<Input
										id='test3'
										name='test3n'
										label={'Required'}
										placeholder={'This is an input with label'}
									/>
									<Input
										id='test4'
										name='test4n'
										leftIcon={<SearchIcon />}
										label={'Required'}
										placeholder={'This is an input with label and left icon'}
									/>
									<Input
										id='test5'
										name='test5n'
										leftIcon={<SearchIcon />}
										rightIcon={<SunIcon />}
										label={'Required'}
										placeholder={'This is an input with label, left icon and right icon'}
									/>
									<Input
										id='test6'
										name='test6n'
										disabled
										leftIcon={<SearchIcon />}
										rightIcon={<SunIcon />}
										label={'Required'}
										placeholder={'This is a disabled input with label, left icon and right icon'}
									/>
								</>
							);
						}}
					/> */}
				</div>
				<div style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
					<CategoryItem image='https://i.ibb.co/tL11nRC/Capture.png' title='Children clothes' onClick={() => {}} />
				</div>
			</div>
			{/* <ListingItem
				image='https://frankfurt.apollo.olxcdn.com/v1/files/tj6e37yggawb2-RO/image;s=1000x700'
				title="Masina lu' Vericu full-opzion full fara trapa pentru pretentiosi"
				createdOn={new Date()}
				onClick={() => {}}
			/>
			<ListingItem
				image='https://frankfurt.apollo.olxcdn.com/v1/files/tj6e37yggawb2-RO/image;s=1000x700'
				title="Masina lu' Vericu full-opzion full fara trapa pentru pretentiosi"
				createdOn={new Date()}
				onClick={() => {}}
				/> */}
		</>
	);
};

// export async function getServerSideProps(context: NextPageContext) {
// 	const listings: any = await (await fetch('http://nginx/api/listings')).json();
// 	console.log(listings)
// 	return {
// 		props: {
// 			listings,
// 		}, // will be passed to the page component as props
// 	};
// }

export default Testing;
