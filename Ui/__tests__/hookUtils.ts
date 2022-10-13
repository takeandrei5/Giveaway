const useStateMock = <T = unknown>(initialValue?: T): [T | undefined, jest.Mock<void, [newState: T]>] => {
	let state: T | undefined = initialValue;
	const setState: jest.Mock<void, [newState: T]> = jest.fn((newState: T) => {
		state = newState;
	});

	return [state, setState];
};

export { useStateMock };
