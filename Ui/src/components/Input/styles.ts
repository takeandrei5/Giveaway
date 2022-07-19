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
				boxShadow: 'base',
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
			boxShadow: 'base',
			_hover: {
				borderSize: '0',
				borderColor: 'none',
			},
			_focus: {
				borderSize: '0.0625rem',
				boxShadow: '2xl',
			},
			paddingTop: 2,
			paddingBottom: 2,
			paddingInlineStart: 4,
			paddingInlineEnd: 4,
		},
	},
};

export default styles;
