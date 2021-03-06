import * as React from "react";
export declare type StringFunction = () => string;
export interface IButtonProps {
    children?: React.ReactChild;
    className?: string;
    onClickHandler?: any;
    text?: string | StringFunction;
    disabled?: any;
    UIType?: string;
}
export interface IButtonState {
    onClickHandler?: any;
    buttonText?: string | StringFunction;
    isDisabled?: boolean;
}
export declare class Button extends React.Component<IButtonProps, IButtonState> {
    constructor(props: IButtonProps);
    render(): JSX.Element;
    private onClickHandler();
}
