import { Box } from '@chakra-ui/react';
import { Input } from '@components';
import { DEFAULT_AVATAR } from '@utils/constants';
import { ChangeEvent } from 'react';

import { useRenderPersons } from './hooks';
import { Person as PersonComponent } from './Person';
import { Person } from './types';

const initialData: Person[] = [
	{
		name: 'Andrei Tache',
		avatarUrl: DEFAULT_AVATAR,
		lastMessageDate: new Date(),
	},
	{
		name: 'Andrei Claudiu',
		avatarUrl: DEFAULT_AVATAR,
		lastMessageDate: new Date(),
	},
	{
		name: 'Alex Tache',
		avatarUrl: DEFAULT_AVATAR,
		lastMessageDate: new Date(),
	},
	{
		name: 'Alex Alex',
		avatarUrl: DEFAULT_AVATAR,
		lastMessageDate: new Date(),
	},
	{
		name: 'Thea Thea',
		avatarUrl: DEFAULT_AVATAR,
		lastMessageDate: new Date(),
	},
];

const Persons = () => {
	const { search, setSearch, filterPersons } = useRenderPersons(initialData);

	const renderPersons = (search: string): JSX.Element[] =>
		filterPersons(search)!.map(
			(person: Person): JSX.Element => (
				<PersonComponent
					key={`${person.avatarUrl}-${person.name}-${person.lastMessageDate}`}
					name={person.name}
					avatarUrl={person.avatarUrl}
					lastMessageDate={person.lastMessageDate}
				/>
			)
		);

	return (
		<Box
			__css={{
				'& > div:nth-of-type(2)': {
					marginTop: 6,
				},
			}}
			bgColor='white'
			borderRadius='2xl'
			boxShadow='base'
			flex={1.5}
			paddingY={6}
			paddingX={3}
			overflowY='auto'
			overflowWrap='break-word'>
			<Input
				id='person-search'
				height='2.5rem'
				name='persons-search'
				placeholder='Search for a person..'
				onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
					setSearch((e as ChangeEvent<HTMLInputElement>).target.value);
				}}
				value={search}
			/>
			{renderPersons(search)}
		</Box>
	);
};

export default Persons;
