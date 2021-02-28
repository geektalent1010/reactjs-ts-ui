// - Import external components
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Footer from 'layouts/footer';
import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from 'config';
import * as authorizeActions from 'store/actions/authorizeActions';

import { INewPasswordComponentProps } from './INewPasswordComponentProps';
import { INewPasswordComponentState } from './INewPasswordComponentState';

// - Components
// - Import actions
const styles = (theme: any) => ({
    textField: {
        minWidth: 280,
        marginTop: 20,
    },
    contain: {
        margin: '0 auto',
        marginTop: 50,
    },
    paper: {
        minHeight: 370,
        maxWidth: 450,
        minWidth: 337,
        textAlign: 'center',
        display: 'block',
        margin: 'auto',
    },
    logo: {
        height: 50,
        marginBottom: 30,
    },
    boxRoot: {
        padding: '20px 40px 36px',
    },
    fullBox: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            with: '100%',
            maxWidth: '100%',
        },
    },
});
/**
 * Create component class
 *
 * @export
 * @class NewPasswordComponent
 * @extends {Component}
 */
export class NewPasswordComponent extends Component<
    INewPasswordComponentProps & WithTranslation,
    INewPasswordComponentState
> {
    /**
     * Component constructor
     *
     */
    constructor(props: INewPasswordComponentProps & WithTranslation) {
        super(props);

        this.state = {
            passwordInput: '',
            passwordInputError: '',
            confirmInput: '',
            confirmInputError: '',
        };
        // Binding function to `this`
        this.handleForm = this.handleForm.bind(this);
    }

    /**
     * Handle data on input change
     * @param  {event} evt is an event of inputs of element on change
     */
    handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });

        switch (name) {
            case 'passwordInput':
                this.setState({
                    passwordInputError: '',
                });
                break;
            case 'confirmInput':
                this.setState({
                    confirmInputError: '',
                    passwordInputError: '',
                });

                break;
            default:
        }
    };

    /**
     * Handle register form
     */
    handleForm = () => {
        const { t, updatePassword } = this.props;
        if (!t) {
            return;
        }
        let error = false;
        if (this.state.passwordInput === '') {
            this.setState({
                passwordInputError: t('changePassword.newPasswordRequiredError'),
            });
            error = true;
        } else if (this.state.confirmInput === '') {
            this.setState({
                confirmInputError: t('changePassword.confirmPasswordRequiredError'),
            });
            error = true;
        } else if (this.state.confirmInput !== this.state.passwordInput) {
            this.setState({
                confirmInputError: t('changePassword.confirmPasswordEqualNewPasswordError'),
            });
            error = true;
        }

        if (!error && updatePassword) {
            updatePassword(this.state.passwordInput, this.state.confirmInput);
        }
    };

    /**
     * Reneder component DOM
     *
     */
    render() {
        const { classes, t, footerDisabled, logoDisabled } = this.props;
        const logoElement = (
            <div
                style={{
                    paddingLeft: '40px',
                    paddingRight: '40px',
                }}
            >
                <img className={classes.logo} src={config.settings.raisedLogo} alt={config.settings.companyName} />
            </div>
        );
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.contain}>
                    {/* <h1 className='g__app-name'>{config.settings.appName}</h1> */}

                    <div className="animate-bottom">
                        <Paper className={classNames(classes.paper, classes.fullBox)} elevation={1}>
                            <div style={{ padding: '48px 40px 36px' }}>
                                {!logoDisabled ? logoElement : ''}
                                <TextField
                                    autoFocus
                                    className={classes.textField}
                                    onChange={this.handleInputChange}
                                    helperText={this.state.passwordInputError}
                                    name="passwordInput"
                                    label={t('changePassword.newPasswordLabel')}
                                    type="password"
                                    error={this.state.passwordInputError.trim() !== ''}
                                />
                                <br />
                                <TextField
                                    className={classes.textField}
                                    onChange={this.handleInputChange}
                                    helperText={this.state.confirmInputError}
                                    name="confirmInput"
                                    label={t('changePassword.confirmPasswordLabel')}
                                    type="password"
                                    error={this.state.confirmInputError.trim() !== ''}
                                />
                                <br />
                                <br />
                                <br />
                                <div className="settings__button-box">
                                    <div>
                                        <Button onClick={this.props.homePage}>
                                            {' '}
                                            {t('changePassword.homeButton')}{' '}
                                        </Button>
                                    </div>
                                    <div>
                                        <Button variant="contained" color="primary" onClick={this.handleForm}>
                                            {' '}
                                            {t('changePassword.changePasswordButton')}{' '}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </Grid>
                {!footerDisabled ? <Footer /> : ''}
            </Grid>
        );
    }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any) => {
    return {
        updatePassword: (newPassword: string, confirmPassword: string) => {
            dispatch(authorizeActions.dbUpdatePassword(confirmPassword, newPassword));
        },
        homePage: () => {
            window.location.href = '/';
        },
    };
};

/**
 * Map state to props
 */
const mapStateToProps = () => {
    return {};
};

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(NewPasswordComponent);

export default withRouter<any, any>(
    connect<any>(mapStateToProps as any, mapDispatchToProps)(withStyles(styles as any)(translateWrapper as any)),
);
