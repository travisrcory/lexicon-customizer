'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ConfigPanel = require('./ConfigPanel');

var _ConfigPanel2 = _interopRequireDefault(_ConfigPanel);

var _MenuIcon = require('./MenuIcon');

var _MenuIcon2 = _interopRequireDefault(_MenuIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header(props) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));

		_this.state = {
			configPanelOpen: false
		};
		return _this;
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'header',
				{ className: 'lexicon-customizer-header' },
				_react2.default.createElement(
					'span',
					{ className: 'lexicon-customizer-header-title' },
					'Lexicon Customizer'
				),
				_react2.default.createElement(
					'div',
					{ className: 'lexicon-customizer-actions' },
					_react2.default.createElement(
						'a',
						{
							className: 'config-panel-toggle-btn',
							href: 'javascript:;',
							onClick: function onClick(e) {
								_this2.setState({
									configPanelOpen: !_this2.state.configPanelOpen
								});
							}
						},
						_react2.default.createElement(_MenuIcon2.default, null)
					),
					_react2.default.createElement(_ConfigPanel2.default, { open: this.state.configPanelOpen })
				)
			);
		}
	}]);

	return Header;
}(_react.Component);

exports.default = Header;