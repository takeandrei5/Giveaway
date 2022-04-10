const styles = {
	baseStyle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: '3.75rem',
		backgroundColor: 'primary.main',
		padding: '0.75rem 1.5rem',
		_disabled: {
			backgroundColor: 'primary.light',
			cursor: 'default',
		},
		_hover: {
			filter: 'brightness(90%)',
			_disabled: {
				backgroundColor: 'primary.light',
				filter: 'brightness(100%)',
			},
		},
		_active: {
			filter: 'brightness(80%)',
		},
	},
};

export default styles;
