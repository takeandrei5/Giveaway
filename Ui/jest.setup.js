global.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn(),
};

window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
		};
	};
