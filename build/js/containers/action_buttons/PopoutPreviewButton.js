'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = require('react-redux');

var _Button = require('../../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _previewPopout = require('../../actions/previewPopout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		disabled: !!state.get('previewPopout')
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		onClick: function onClick(e) {
			dispatch((0, _previewPopout.createPreviewPopout)());
		}
	};
};

var PopoutPreviewButton = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Button2.default);

exports.default = PopoutPreviewButton;