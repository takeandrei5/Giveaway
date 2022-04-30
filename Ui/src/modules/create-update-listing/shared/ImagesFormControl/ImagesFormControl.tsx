import { Box, Button, Center, Flex, Icon, Image, Input, Spinner } from '@chakra-ui/react';
import { FormControl } from 'components';
import { useField } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	Droppable,
	DroppableProvided,
} from 'react-beautiful-dnd';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import { GrTrash } from 'react-icons/gr';
import { defaultImageUpload } from 'utils/constants';

import { ImageFormikValue } from '../types';
import { useDragAndDrop, useImageUpload } from './hooks';
import { ImagesFormControlProps } from './types';

const ImagesFormControl = ({ name }: ImagesFormControlProps) => {
	const [field, meta, helpers] = useField<ImageFormikValue[]>({ name });

	const { onImageUploaded, onImageDeleted, isUploading } = useImageUpload(name);
	const { onDragEnd } = useDragAndDrop(name);

	const router: NextRouter = useRouter();

	const renderDeleteImageButton = (value: ImageFormikValue): JSX.Element =>
		value.url ? (
			<Center
				backgroundColor='dark'
				opacity='0.98'
				height='100%'
				width='100%'
				position='absolute'
				zIndex='100'
				visibility='hidden'
				transition='visibility 0s linear 0s, opacity 300ms'>
				<Button
					bg='gray.200'
					padding='0'
					_active={{ bg: 'gray.200', filter: 'brightness(80%)' }}
					_focus={{ border: 'none' }}
					_hover={{ bg: 'gray.200', filter: 'brightness(90%)' }}
					rounded='full'
					onClick={() => {
						onImageDeleted(value.id);
					}}>
					<Icon as={GrTrash} color={'darkish'} height='1rem' width='1rem' />
				</Button>
			</Center>
		) : (
			<></>
		);

	const renderList = (): JSX.Element[] =>
		field.value.map(
			(value: ImageFormikValue, index: number): JSX.Element => (
				<Draggable key={value.id} draggableId={value.id} index={index} disableInteractiveElementBlocking>
					{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
						<Box
							ref={provided.innerRef}
							cursor='default'
							marginRight='0.5rem'
							width='100%'
							position='relative'
							userSelect='none'
							_hover={{ '& > div': { visibility: 'visible' } }}
							{...provided.draggableProps}
							{...provided.dragHandleProps}>
							{renderDeleteImageButton(value)}
							<Input
								type='file'
								accept='image/png, image/jpeg'
								borderRadius='0'
								title='image upload'
								cursor='pointer'
								position='absolute'
								width='100%'
								height='100%'
								opacity='0'
								required={false}
								pointerEvents={isUploading ? 'none' : 'auto'}
								onChange={(e) => {
									onImageUploaded(value.id, e.target.files?.[0]);
									e.target.value = '';
								}}
								style={{ textIndent: '-999px' }}
							/>
							{index === 0 && <Icon as={BsFillBookmarkStarFill} position='absolute' top='0.125rem' right='0.5rem' />}
							<Image
								draggable={false}
								height='100%'
								objectFit='cover'
								width='100%'
								src={value.url || defaultImageUpload}
								alt='imageUpload'
							/>
						</Box>
					)}
				</Draggable>
			)
		);

	return (
		<FormControl label='Images:' id='images-dragdrop' name={name}>
			<>
				{isUploading && <Spinner position='absolute' top='50%' left='calc(50% - 16px)' zIndex='1000' />}
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='droppable' direction='horizontal'>
						{(provided: DroppableProvided) => (
							<Flex
								ref={provided.innerRef}
								justifyContent='space-between'
								minHeight='5rem'
								maxHeight='7.5rem'
								width='100%'
								{...provided.droppableProps}>
								{renderList()}
								{provided.placeholder}
							</Flex>
						)}
					</Droppable>
				</DragDropContext>
			</>
		</FormControl>
	);
};

export default ImagesFormControl;
