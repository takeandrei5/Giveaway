import { CustomArrowProps } from 'react-slick';

export type ArrowProps = { isNextArrow?: boolean } & Omit<CustomArrowProps, 'currentSlide' | 'slideCount'>;
