import * as React from "react";
export declare type StringFunction = () => string;
export declare type StringToVoid = (f: string | number) => void;
export interface RadioButtonProps {
    name: string;
    children?: React.ReactChild;
    className?: string;
    values: [string];
    disabled?: any;
    textValues?: [string | StringFunction];
    title?: string | StringFunction;
    selectedOption?: string;
    notifyOnChange?: StringToVoid;
}
export interface RadioButtonState {
    name: string;
    isDisabled?: boolean;
    values: [string];
    textValues: [string | StringFunction];
    title?: string | StringFunction;
    selectedOption?: string;
}
declare class _EB_RadioButtonList extends React.Component<RadioButtonProps, RadioButtonState> {
    constructor(props: RadioButtonProps);
    _updateStateAndNotify(selectedOption: string): void;
    handleOptionChange(changeEvent: React.ChangeEvent<HTMLInputElement>): void;
    handleLiClick(clickEvent: React.MouseEvent<HTMLSpanElement>): void;
    render(): JSX.Element;
}
export { _EB_RadioButtonList };
declare const EB_RadioButtonList: any;
export { EB_RadioButtonList };
