import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import Captcha from 'components/recaptcha';
import { LoginUser } from 'core/domain/authorize/loginUser';
import { IAuthorizeService } from 'core/services/authorize/IAuthorizeService';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import Footer from 'layouts/footer';
import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { provider } from 'socialEngine';
import config from 'config';
import * as authorizeActions from 'store/actions/authorizeActions';
import * as globalActions from 'store/actions/globalActions';

import { IResetPasswordComponentProps } from './IResetPasswordComponentProps';
import { IResetPasswordComponentState } from './IResetPasswordComponentState';
import { ResetPasswordStepType } from './resetPasswordStepType';
import { resetPasswordStyles } from './resetPasswordStyles';

// - Material UI
// - Components
// - Import actions

export class ResetPasswordComponent extends Component<
    IResetPasswordComponentProps & WithTranslation,
    IResetPasswordComponentState
> {
    _authorizeService: IAuthorizeService;

    constructor(props: IResetPasswordComponentProps & WithTranslation) {
        super(props);
        this._authorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService);
        this.state = {
            email: '',
            emailError: '',
            code: '',
            codeError: '',
            isNextDisabled: true,
            isVerifyDisabled: true,
            verifyId: '',
            loading: false,
            step: ResetPasswordStepType.EnterEmail,
            isCaptchaSuccess: false,
            captchaVerifier: null,
        };
        // Binding function to `this`
        this.handleNextEmail = this.handleNextEmail.bind(this);
    }

    /**
     * Handle data on input change
     * @param  {event} evt is an event of inputs of element on change
     */
    handleInputChange = (event: any) => {
        const { t } = this.props;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'email') {
            let emailError = '';

            if (value && value.trim() === '') {
                emailError = t('resetPassword.requiredEmailError');
            }
            const email = value.trim();
            this.setState({
                email,
                emailError,
                isNextDisabled: emailError !== '',
            });
        }

        if (name === 'code') {
            let codeError = '';
            const code = value ? (value as string).trim() : '';
            if (!value || (value && (value as string).trim() === '')) {
                codeError = t('smsVerification.requiredCodeError');
            } else if (value && (value as string).trim().length !== 4) {
                codeError = t('smsVerification.validCodeError');
            }
            this.setState({
                code,
                codeError,
                isVerifyDisabled: codeError !== '',
            });
        }
    };

    /**
     * Handle register form
     */
    handleNextEmail = () => {
        const { showMessage } = this.props;
        const { email, isCaptchaSuccess, captchaVerifier } = this.state;
        if (email && email.trim() !== '' && isCaptchaSuccess) {
            this.setState({
                loading: true,
            });
            const { email } = this.state;
            this._authorizeService
                .sendResetPasswordVerification(email.trim(), captchaVerifier)
                .then((verifyId: string) => {
                    this.setState({
                        step: ResetPasswordStepType.VerificationCode,
                        verifyId,
                        loading: false,
                    });
                })
                .catch((error) => {
                    if (showMessage) {
                        showMessage(error.message);
                    }
                    this.handleReset();
                });
        }
    };

    /**
     * Handle success result of solving captcha
     */
    handleSuccessCaptcha = (value: any) => {
        this.setState({
            captchaVerifier: value,
            isCaptchaSuccess: true,
        });
    };

    /**
     * Handle expired captcha
     */
    handleExpiredCaptcha = () => {
        const { showMessage, t } = this.props;
        if (t && showMessage) {
            showMessage(t('resetPassword.capthaExpiredMessage'));
        }
        this.handleReset();
    };

    /**
     * Handle reset sms verification
     */
    handleReset = () => {
        this.setState({
            email: '',
            emailError: '',
            code: '',
            codeError: '',
            loading: false,
            isNextDisabled: true,
            isVerifyDisabled: true,
            step: ResetPasswordStepType.EnterEmail,
        });
    };

    /**
     * Handle verify code
     */
    handleVerifyCode = () => {
        const { code, verifyId, email } = this.state;
        const { updatePassword, showMessage, login } = this.props;
        if (!login || !updatePassword || !showMessage) {
            return;
        }
        this._authorizeService
            .confirmResetPassword(code, verifyId, email)
            .then((user: LoginUser) => {
                login(user);
                updatePassword();
            })
            .catch((error) => {
                showMessage(error.message);
                this.handleReset();
            });
    };

    /**
     * Handle error capthcha render
     */
    handleErrorCapthaRender = () => {
        const { showMessage, t } = this.props;
        if (showMessage && t) {
            showMessage(t('resetPassword.capthaRenderErrorMessage'));
        }
        this.handleReset();
    };

    render() {
        const { classes, t, logout } = this.props;
        const {
            email,
            emailError,
            isNextDisabled,
            step,
            code,
            codeError,
            isVerifyDisabled,
            loading,
            isCaptchaSuccess,
        } = this.state;

        return (
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.contain}>
                    {/* <h1 className='g__app-name'>{config.settings.appName}</h1> */}

                    <div className="animate-bottom">
                        <Paper className={classes.paper} elevation={1}>
                            <div className={classes.boxRoot}>
                                <div
                                    style={{
                                        paddingLeft: '40px',
                                        paddingRight: '40px',
                                    }}
                                >
                                    <img
                                        className={classes.logo}
                                        src={config.settings.raisedLogo}
                                        alt={config.settings.companyName}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div
                                    className={classnames({
                                        [classes.noDisplay]: step !== ResetPasswordStepType.EnterEmail,
                                    })}
                                >
                                    <FormControl
                                        className={classes.formControl}
                                        error={emailError !== ''}
                                        aria-describedby="email-error-text"
                                    >
                                        <InputLabel htmlFor="email">{t('resetPassword.emailLabel')}</InputLabel>
                                        <Input
                                            type={'email'}
                                            id="email"
                                            value={email}
                                            name={'email'}
                                            onChange={this.handleInputChange}
                                            autoFocus
                                        />
                                        <FormHelperText id="email-error-text">{emailError}</FormHelperText>
                                    </FormControl>
                                    <br />
                                    <br />
                                    {/* Recaptcha */}
                                    <Captcha
                                        onSuccess={this.handleSuccessCaptcha}
                                        onExpired={this.handleExpiredCaptcha}
                                        onRenderError={this.handleErrorCapthaRender}
                                    />
                                    <div className="settings__button-box">
                                        <div>
                                            <Button className={classes.backButton} onClick={logout}>
                                                {t('resetPassword.backButton')}
                                            </Button>
                                        </div>
                                        <div className={classes.wrapper}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.nextButton}
                                                disabled={isNextDisabled || !isCaptchaSuccess || loading}
                                                onClick={this.handleNextEmail}
                                            >
                                                {t('resetPassword.verifyButton')}{' '}
                                            </Button>
                                            {loading && (
                                                <CircularProgress size={24} className={classes.buttonProgress} />
                                            )}
                                        </div>
                                    </div>
                                    <Typography className={classes.caption} variant="caption" component="p">
                                        {t('resetPassword.emailDescription')}
                                    </Typography>
                                </div>

                                {/* Verification Code */}
                                <div
                                    className={classnames({
                                        [classes.noDisplay]: step !== ResetPasswordStepType.VerificationCode,
                                    })}
                                >
                                    <FormControl
                                        className={classes.formControl}
                                        error={codeError !== ''}
                                        aria-describedby="code-error-text"
                                    >
                                        <InputLabel htmlFor="code">{t('resetPassword.codeLabel')}</InputLabel>
                                        <Input
                                            type={'tel'}
                                            id="code"
                                            value={code}
                                            name={'code'}
                                            onChange={this.handleInputChange}
                                            autoFocus
                                        />
                                        <FormHelperText id="code-error-text">{codeError}</FormHelperText>
                                    </FormControl>
                                    <br />
                                    <br />
                                    <div className="settings__button-box">
                                        <div>
                                            <Button className={classes.nextButton} onClick={logout}>
                                                {t('resetPassword.resetButton')}
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.nextButton}
                                                disabled={isVerifyDisabled}
                                                onClick={this.handleVerifyCode}
                                            >
                                                {t('resetPassword.verifyButton')}{' '}
                                            </Button>
                                        </div>
                                    </div>
                                    <Typography className={classes.caption} variant="caption" component="p">
                                        {t('resetPassword.codeVerifyDescription')}
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </Grid>
                <Footer />
            </Grid>
        );
    }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: Function) => {
    return {
        logout: () => dispatch(authorizeActions.dbLogout()),
        home: () => {
            location.href = '/';
        },
        updatePassword: () => {
            location.href = '/newPassword';
        },
        showMessage: (message: string) => dispatch(globalActions.showMessage(message)),
        login: (user: LoginUser) => dispatch(authorizeActions.login(user)),
    };
};

/**
 * Map state to props
 */
const mapStateToProps = () => {
    return {};
};

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(ResetPasswordComponent);

export default connect<{}, {}, any, any>(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(resetPasswordStyles as any)(translateWrapper as any));
