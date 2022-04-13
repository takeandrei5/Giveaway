import { Skeleton as SkeletonChakra, SkeletonProps, useColorModeValue } from '@chakra-ui/react';

const Skeleton = (props: SkeletonProps): JSX.Element => {
	const color = useColorModeValue('blackAlpha.300', 'blackAlpha.300');

	return <SkeletonChakra startColor={color} endColor={color} {...props} />;
};

export default Skeleton;
