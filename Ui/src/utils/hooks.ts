import { DependencyList, EffectCallback, MutableRefObject, useEffect, useRef } from 'react';

const useEffectNoMount = (effect: EffectCallback, deps?: DependencyList | undefined): void => {
	const isMountRef: MutableRefObject<boolean> = useRef<boolean>(true);

	useEffect(() => {
		if (isMountRef) {
			isMountRef.current = false;
			return;
		}

		effect();
	}, deps);
};

export { useEffectNoMount };
