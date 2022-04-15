const styles = {
	baseStyle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: '2xl',
		backgroundColor: 'primary.main',
		border: 0,
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
		_focus: { boxShadow: 'none' },
		_active: {
			filter: 'brightness(80%)',
		},
	},
};

export default styles;
