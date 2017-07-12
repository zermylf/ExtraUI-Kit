"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Radium = require("radium");
var React = require("react");
var css = require("./css_eb_tabmenu");
var eb_tab_1 = require("./eb_tab");
var EBTabMenu = (function (_super) {
    __extends(EBTabMenu, _super);
    function EBTabMenu(props) {
        var _this = _super.call(this) || this;
        _this.state = {
            values: props.values,
            isDisabled: props.disabled ? true : false,
            name: props.name,
            textValues: props.textValues ? props.textValues : props.values,
            selectedOption: props.selectedOption,
        };
        _this.onTabClick = _this.onTabClick.bind(_this);
        return _this;
    }
    EBTabMenu.prototype.render = function () {
        var _this = this;
        var stylesLiArr = this.state.isDisabled ? [css.TabMenuBase] : [css.TabMenuBase];
        var tabs = this.state.values.map(function (itemValue, index) {
            var styleTab = _this.state.selectedOption === itemValue ?
                [css.tabBase, css.selectedTab] : [css.tabBase, css.notSelectedTab];
            return (React.createElement("span", { key: index, value: itemValue, style: styleTab, onClick: _this.onTabClick }, _this.state.textValues[index]));
        });
        var selectedTabContentArr = React.Children.map(this.props.children, function (child) {
            var c = child;
            if (c.props && _this.state.selectedOption && c.props.value === _this.state.selectedOption && c.type === eb_tab_1.Tab) {
                return child;
            }
        });
        var selectedTabContent = selectedTabContentArr.length ? selectedTabContentArr[0] : null;
        var tabHeading = (React.createElement("div", { style: [css.tabsStyle] }, tabs));
        return (React.createElement("div", null,
            React.createElement(Radium.StyleRoot, null,
                React.createElement("div", { style: stylesLiArr },
                    tabHeading,
                    React.createElement("div", null, selectedTabContent)))));
    };
    EBTabMenu.prototype.onTabClick = function (clickEvent) {
        var safeTypeValue = clickEvent.currentTarget.getAttribute("value");
        this.setState({ selectedOption: safeTypeValue });
    };
    return EBTabMenu;
}(React.Component));
exports.EBTabMenu = EBTabMenu;
var TabMenu = Radium(EBTabMenu);
exports.TabMenu = TabMenu;
//# sourceMappingURL=eb_tabmenu.js.map