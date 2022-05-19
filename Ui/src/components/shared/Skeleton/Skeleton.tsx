import { Skeleton as SkeletonChakra, SkeletonProps, useColorModeValue } from '@chakra-ui/react';

const Skeleton = (props: SkeletonProps): JSX.Element => (
	<SkeletonChakra startColor={'blackAlpha.300'} endColor={'blackAlpha.300'} {...props} />
);
export default Skeleton;
