import { GrNext, GrPrevious } from 'react-icons/gr';

import { ArrowProps } from './types';

const Arrow = ({ isNextArrow = false, ...rest }: ArrowProps): JSX.Element =>
	isNextArrow ? (
		<GrNext className='slick-next slick-arrow' {...rest} />
	) : (
		<GrPrevious className='slick-prev slick-arrow' {...rest} />
	);

export default Arrow;
