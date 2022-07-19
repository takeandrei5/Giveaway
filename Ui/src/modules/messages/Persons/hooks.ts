import { useEffect, useRef, useState } from 'react';

import { Person } from './types';

const useRenderPersons = (initialData: Person[]) => {
	const initialDataRef = useRef<Person[]>(initialData);

	const [search, setSearch] = useState<string>('');

	const filterPersons = (search: string): Person[] =>
		initialDataRef.current.filter((person: Person) => {
			if (!search.trim()) {
				return true;
			}

			return person.name.includes(search);
		});

	useEffect(() => {
		initialDataRef.current = initialData;
	}, [initialData]);

	return { search, setSearch, filterPersons };
};

export { useRenderPersons };
