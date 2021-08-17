import TextField from '@material-ui/core/TextField/TextField';
import React, { Component } from 'react';

import { IAppInputComponentProps } from './IAppInputComponentProps';
import { IAppInputComponentState } from './IAppInputComponentState';

export default class AppInputComponent extends Component<IAppInputComponentProps, IAppInputComponentState> {
    /**
     * Fields
     */
    input: any;

    constructor(props: IAppInputComponentProps) {
        super(props);

        // Defaul state
        this.state = {};

        // Binding functions to `this`
    }
    focus = () => {
        this.input.focus();
    };

    render() {
        return <TextField inputRef={(el) => (this.input = el)} fullWidth {...this.props} />;
    }
}
