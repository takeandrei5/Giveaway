import { GrNext, GrPrevious } from 'react-icons/gr';

import { ArrowProps } from './types';

const Arrow = ({ isNextArrow = false, ...rest }: ArrowProps): JSX.Element =>
	isNextArrow ? (
		<GrPrevious className='slick-prev slick-arrow' {...rest} />
	) : (
		<GrNext className='slick-next slick-arrow' {...rest} />
	);

export default Arrow;
