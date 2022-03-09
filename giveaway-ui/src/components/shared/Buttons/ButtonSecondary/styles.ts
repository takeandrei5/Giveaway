const styles = {
	baseStyle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: '3.75rem',
		fontSize: '1rem',
		fontWeight: '700',
		lineHeight: '1rem',
		background: 'primary.dark',
		padding: '0.75rem 1.5rem',
		_disabled: {
			background: 'primary.light',
			cursor: 'default',
		},
		_hover: {
			filter: 'brightness(90%)',
			_disabled: {
				background: 'primary.light',
				filter: 'brightness(100%)',
			},
		},
		_active: {
			filter: 'brightness(80%)',
		},
	},
};

export default styles;
