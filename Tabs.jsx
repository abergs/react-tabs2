/**
 * @jsx React.DOM
 */
var React = require("react/addons");
var cs = React.addons.classSet;

module.exports = React.createClass({
	displayName: 'Tabs',

	getInitialState: function() {
		return {
			selectedTab: 0,
			lastTab: 0
		};
	},

	getDefaultProps: function() {
		return {
			onChange: null
		};
	},

	notifyOthers: function (newTab, lastTab) {
		if(typeof(this.props.onChange) === 'function') {
			this.props.onChange(newTab, lastTab);
		}
	},

	selectTab: function(index) {

		var newTab = index;
		var lastTab = this.state.selectedTab;

		// If nothing changed do nothing
		if(newTab === lastTab) return;
		
		this.setState({
			lastTab: lastTab,
			selectedTab: newTab
		});

		this.notifyOthers(newTab, lastTab);
	},

	renderPanels: function(panels) {
		var state = this.state;

		return React.Children.map(panels, function(panelDesc, index) {
			var panel = React.addons.cloneWithProps(panelDesc);
			var selected = state.selectedTab === index;
			
			var displaymode = selected ? 'block' : 'none';
			var classes = cs({
				'tabs-tabpanel':true,
				'tabs-tabpanel-selected': selected
			});

			var styles = {"display": displaymode};
			
			return <div style={styles} className={classes}>{panel}</div>;
		});
	},

	renderTabs: function(tabsDesc, panels, clickHandler) {
		var state = this.state;
		return React.Children.map(tabsDesc, function(tabDesc, index) {
			var tab = React.addons.cloneWithProps(tabDesc, {isSelected: state.selectedTab === index, onClick: clickHandler(index)});
			panels.push(tab.props.children);
			return tab;
		});
	},

	clickHandler: function (index) {
			return function () {
				this.selectTab(index);
			}.bind(this);
	},


	render: function() {

		var tabsDesc = this.props.children;
		var state = this.state;
		var panels = [];

		var renderedChildren = this.renderTabs(tabsDesc, panels, this.clickHandler);

		var renderedPanels = this.renderPanels(panels);

		return (
			<div>
				<ul>
					{renderedChildren}
				</ul>
				<div>
					{renderedPanels}
				</div>
			</div>
		);
	}
});