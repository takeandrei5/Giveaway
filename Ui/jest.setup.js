global.console = {
	...global.console,
	error: jest.fn(),
	warn: jest.fn(),
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
