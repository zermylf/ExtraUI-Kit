import * as Radium from "radium";
import * as React from "react";
import {ICSSProperties} from "../css_types";
import * as css from "./css_eb_tabmenu";
import ReactChild = React.ReactChild;
import { Tab } from "./eb_tab";

export type StringFunction = () => string;
export type StringToVoid = (f: string | number) => void;

export interface ITabMenuProps {
  name: string,
  children?: React.ReactChild,
  className?: string,
  values: [string],
  disabled?: any,
  textValues?: [string | StringFunction],
  selectedOption?: string,
  notifyOnChange?: StringToVoid
}

export interface ITabMenuState {
  name: string
  isDisabled?: boolean,
  values: [string],
  textValues: [string | StringFunction],
  title?: string | StringFunction,
  selectedOption?: string,
}

class EBTabMenu extends React.Component<ITabMenuProps, ITabMenuState> {
  constructor(props: ITabMenuProps) {
    super();
    this.state = {
      values: props.values,
      isDisabled: props.disabled ? true : false,
      name: props.name,
      textValues: props.textValues ? props.textValues : props.values,
      selectedOption: props.selectedOption,
    };
    this.onTabClick = this.onTabClick.bind(this);
  }

  public render() {
    const stylesLiArr: [ICSSProperties] =
      this.state.isDisabled ? [css.TabMenuBase] : [css.TabMenuBase];
    const tabs: JSX.Element[] = this.state.values.map((itemValue, index) => {
      const styleTab: [ICSSProperties] = this.state.selectedOption === itemValue ?
        [css.tabBase, css.selectedTab] : [css.tabBase, css.notSelectedTab];
      return (
        <span key={index} value={itemValue} style={styleTab} onClick={this.onTabClick}>
          {this.state.textValues[index]}
        </span>
      );
    });
    const selectedTabContentArr = React.Children.map(this.props.children, (child) => {
      const c = (child as JSX.Element);
      if (c.props && this.state.selectedOption && c.props.value === this.state.selectedOption && c.type === Tab) {
        return child;
      }
    });
    const selectedTabContent = selectedTabContentArr.length ? selectedTabContentArr[0] : null;
    const tabHeading: JSX.Element = (
      <div style={[css.tabsStyle]}>
        {tabs}
      </div>
    );
    return (
      <div>
        <Radium.StyleRoot>
          <div style={stylesLiArr}>
            {tabHeading}
            <div>
              {selectedTabContent}
            </div>
          </div>
        </Radium.StyleRoot>
      </div>
    );
  }

  private onTabClick(clickEvent: React.MouseEvent<HTMLSpanElement>): void {
    const safeTypeValue: string = clickEvent.currentTarget.getAttribute("value");
    this.setState({selectedOption: safeTypeValue});
  }
}

export { EBTabMenu };
const TabMenu = Radium(EBTabMenu);
export { TabMenu };