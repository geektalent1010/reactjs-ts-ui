import { Map } from 'immutable';
import { DialogType } from 'models/common/dialogType';
import { connect } from 'react-redux';
import * as globalActions from 'store/actions/globalActions';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';
import { globalSelector } from 'store/reducers/global/globalSelector';
import { WithTranslation, withTranslation } from 'react-i18next';
import { IRightPanelProps } from './IRightPanelProps';
import { withStyles } from '@material-ui/core/styles';
import { rightPanelStyles } from './rightPanelStyles';

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any) => {
    return {
        openPostWrite: () => dispatch(globalActions.openDialog(DialogType.PostWrite)),
        closePostWrite: () => dispatch(globalActions.closeDialog(DialogType.PostWrite)),
    };
};

/**
 * Map state to props
 */
const makeMapStateToProps = () => {
    const selectCurrentUser = authorizeSelector.selectCurrentUser();
    const selectPostWriteDialogState = globalSelector.selectDialogState();
    const selectProgress = globalSelector.selectProgress();

    const mapStateToProps = (state: Map<string, any>) => {
        const currentUser = selectCurrentUser(state);
        const postWriteDilogOpen = selectPostWriteDialogState(state, { type: DialogType.PostWrite });

        const progress = selectProgress(state);
        return {
            avatar: currentUser.get('avatar', ''),
            fullName: currentUser.get('fullName'),
            postWriteDilogOpen,
            progress,
        };
    };
    return mapStateToProps;
};

export const connectRightPanel = (component: React.ComponentType<IRightPanelProps & WithTranslation>) => {
    const translateWrapper = withTranslation('translations')(component);
    return connect<{}, {}, IRightPanelProps, any>(
        makeMapStateToProps,
        mapDispatchToProps,
    )(withStyles(rightPanelStyles)(translateWrapper));
};
