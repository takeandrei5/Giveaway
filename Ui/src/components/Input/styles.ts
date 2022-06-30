const styles = {
	baseStyle: {
		fontSize: '1rem',
		fontWeight: '500',
		lineHeight: '1.125rem',
		field: {
			//field is for input specifically
			fontSize: '1rem',
			fontWeight: '500',
			lineHeight: '1.125rem',
		},
	},
	variants: {
		outline: {
			field: {
				//field is for input specifically
				backgroundColor: 'white',
				borderRadius: '2xl',
				borderSize: '0',
				_hover: {
					borderSize: '0',
					borderColor: 'none',
				},
				_focus: {
					borderSize: '0.0625rem',
				},
			},
			backgroundColor: 'white',
			borderRadius: '2xl',
			borderSize: '0',
			_hover: {
				borderSize: '0',
				borderColor: 'none',
			},
			_focus: {
				borderSize: '0.0625rem',
			},
		},
	},
};

export default styles;
