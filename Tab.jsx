/**
 * @jsx React.DOM
 */
var React = require("react/addons");
var cs = React.addons.classSet;

module.exports = React.createClass({
	displayName: 'Tab',

	getDefaultProps: function() {
		return {
			isSelected:false,
			onClick: function () {}
		};
	},

	propTypes: {
		isSelected: React.PropTypes.bool,
		//onClick: React.PropTypes.function // Throws error
	},	

	render: function() {
		var classes = cs({
			'tabs-tab':true,
			'tabs-tab-selected': this.props.isSelected
		});
		
		return (
			<li role="tab" className={classes} onClick={this.props.onClick}>{this.props.tabTitle}</li>
		);
	}
});