import * as Radium from "radium";
import * as React from "react";
import {ICSSProperties} from "../css_types";
import * as css from "./css_eb_valueslider";
import ChangeEvent = React.ChangeEvent;
import * as Icons from "../Icons/_allIcons";

export type StringFunction = () => string;
export type StringToVoid = (f: string | number) => void;
export type AnyToVoid = (f: any) => void;

export interface IValueSliderProps {
  children?: React.ReactChild,
  className?: string,
  disabled?: boolean,
  maxValue: number,
  minValue: number
  title: string | StringFunction,
  currentValue?: number,
  notifyOnChange?: StringToVoid,
  sizeH?: number,
  icon?: string,
  iconClick?: AnyToVoid
}

export interface IValueSliderState {
  isDisabled?: boolean,
  title: string | StringFunction,
  currentValue: number,
  tmpValue: number | string,
  mouseMoveReady: boolean,
  currentXPos: number,
  initialXPos?: number,
  initialSliderValue?: number,
  isEditBoxMounted: boolean,
  input_id?: string,
  shiftPressed: boolean
}

class EBValueSlider extends React.Component<IValueSliderProps, IValueSliderState> {
  constructor(props: IValueSliderProps) {
    super();
    const max: number = props.maxValue;
    const min: number = props.minValue;
    this.state = {
      isDisabled: props.disabled ? true : false,
      title: props.title,
      currentValue: !isNaN(props.currentValue) ? props.currentValue : (min + max) / 2,
      mouseMoveReady: false,
      currentXPos: 0,
      isEditBoxMounted: false,
      tmpValue: "",
      input_id: String(Math.random()),
      shiftPressed: false
    };
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.mountEditValueBox = this.mountEditValueBox.bind(this);
    this.unmountEditValueBoxSave = this.unmountEditValueBoxSave.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.outsideEditValueBoxClick = this.outsideEditValueBoxClick.bind(this);
    // this.handlePressedShift = this.handlePressedShift.bind(this);
    // this.handleReleasedShift = this.handleReleasedShift.bind(this);

  }

  public render() {
    const rand_tmp_id = String(Math.random());
    const mainBase: [ICSSProperties] =
      this.props.sizeH ? [css.MainBase, {width: `${this.props.sizeH}px`}] : [css.MainBase];
    const noEditBoxSlider =
      (
        <span
          style={[css.Draggable]}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onDoubleClick={this.mountEditValueBox}
          onMouseUp={this.onMouseUp}
          tabIndex={0}
        >
          {this.state.currentValue}
        </span>
      );
    const EditBoxSlider =
      (
        <span
          style={[css.Draggable]}
        >
          <input
            id={this.state.input_id}
            style={[css.InputField]}
            value={this.state.tmpValue}
            ref={this.focusInput}
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputKeyPress}
            onFocus={this.selectTextIfFocused}
            className="extraui-valueslider__input"
          />
        </span>
      );
    const IconComponentOpt = this.props.icon ? Icons[this.props.icon] : false;
    const IconComponentWithClick = this.props.icon && this.props.iconClick ?
      (
        <span
          style={{cursor: 'pointer'}}
          onClick={(e) => { this.props.iconClick(e)}}
        >
          <IconComponentOpt/>
        </span>
      )
      : <IconComponentOpt/>;
    return (
      <div>
        <Radium.StyleRoot>
          <div style={mainBase}>
            <span style={[css.Title]}>{this.state.title}</span>
            {IconComponentWithClick && IconComponentOpt ? IconComponentWithClick : null}
            {!this.state.isEditBoxMounted ? noEditBoxSlider : EditBoxSlider}
          </div>
        </Radium.StyleRoot>
      </div>
    );
  }

  private selectTextIfFocused(e: any) {
    e.target.select();
  }

  private focusInput(input: any): any {
    return input && input.focus();
  }

  private _updateStateAndNotify(currentValue: number) {
    if (!this.state.isDisabled) {
      if (this.props.minValue > currentValue) {
        currentValue = this.props.minValue;
      }
      if (this.props.maxValue < currentValue) {
        currentValue = this.props.maxValue;
      }
      if (this.props.notifyOnChange) {
        this.setState({currentValue}, () => {
          this.props.notifyOnChange(currentValue);
        });
      } else {
        this.setState({currentValue});
      }
    }
  }

  private onMouseDown(mouseEvent: React.MouseEvent<HTMLSpanElement>): void {
    const max: number = this.props.maxValue;
    const min: number = this.props.minValue;
    // console.log(mouseEvent);
    this.setState({
      mouseMoveReady: true,
      initialXPos: mouseEvent.pageX,
      initialSliderValue: !isNaN(this.state.currentValue) ? this.state.currentValue : (min + max) / 2,
    });
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);

    // window.addEventListener("keydown", this.handlePressedShift);
    // window.addEventListener("keyup", this.handleReleasedShift);
  }

  private onMouseMove(mouseEvent: any): void {
    if (this.state.mouseMoveReady) {
      const initialValue = this.state.initialSliderValue;
      const initialX = this.state.initialXPos;
      const currX = mouseEvent.pageX;
      const modifier = this.state.shiftPressed ? 10 : 1
      const currValue = initialValue + modifier * (currX - initialX);
      this._updateStateAndNotify(currValue);
    }
  }

  private onMouseUp(mouseEvent: any): void {
    this.setState({
      mouseMoveReady: false,
    });
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  private mountEditValueBox(): void {
    const isEditBoxMounted = !this.state.isEditBoxMounted;
    this.setState({isEditBoxMounted, tmpValue: this.state.currentValue});
    window.addEventListener('click', this.outsideEditValueBoxClick);
  }

  private unmountEditValueBoxSave(): void {
    const intValue: number = Number(this.state.tmpValue);
    if (!isNaN(intValue)) {
      this.setState({currentValue: intValue}, () => {
        this._updateStateAndNotify(intValue);
      });
    }
    const isEditBoxMounted = !this.state.isEditBoxMounted;
    this.setState({isEditBoxMounted});
    window.removeEventListener('click', this.outsideEditValueBoxClick);
  }

  private outsideEditValueBoxClick(mouseEvent: any): void {
    const _id = mouseEvent.target.id
    if (_id != this.state.input_id) {
      this.unmountEditValueBoxSave();
    }
  }

  private handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({tmpValue: e.target.value});
  }

  private handleInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      this.unmountEditValueBoxSave();
    }
  }

  // private handlePressedShift(e) {
  //   console.log(e)
  //   console.log(e.shiftKey);
  //   if (e.shiftKey) {
  //     this.setState({shiftPressed: true});
  //   }
  // }
  //
  // private handleReleasedShift(e) {
  //   console.log(e.shiftKey);
  //   if (e.shiftKey) {
  //     this.setState({shiftPressed: false});
  //   }
  // }

  // componentWillUnmount() {
  //   super.componentWillUnmount();
  //   window.removeEventListener("keydown", this.handlePressedShift);
  //   window.removeEventListener("keyup", this.handleReleasedShift);
  // }
}

export { EBValueSlider };
const ValueSlider = Radium(EBValueSlider);
export { ValueSlider };
