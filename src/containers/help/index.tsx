// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { connectHelp } from './connectHelp';
import { helpStyles } from './helpStyles';
import { IHelpProps } from './IHelpProps';
import { IHelpState } from './IHelpState';

export class HelpComponent extends Component<IHelpProps & WithTranslation, IHelpState> {
    /**
     * Fields
     */
    iframeRef: React.RefObject<HTMLIFrameElement>;

    /**
     * Component constructor
     *
     */
    constructor(props: IHelpProps & WithTranslation) {
        super(props);
        this.iframeRef = React.createRef();

        // Defaul state
        this.state = {};
    }

    /**
     * Reneder component DOM
     *
     */
    render() {
        const { classes } = this.props;
        return <div className={classes.root}></div>;
    }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(HelpComponent);

export default withRouter<any, any>(connectHelp(withStyles(helpStyles as any)(translateWrapper as any) as any));
