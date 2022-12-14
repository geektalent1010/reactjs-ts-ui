// - Import react components
import UserBox from 'components/userBox/UserBoxComponent';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IUserBoxListComponentProps } from './IUserBoxListComponentProps';
import { IUserBoxListComponentState } from './IUserBoxListComponentState';

export class UserBoxListComponent extends Component<IUserBoxListComponentProps, IUserBoxListComponentState> {
    static propTypes = {
        /**
         * List of users
         */
        users: PropTypes.object,
    };

    /**
     * Component constructor
     *
     */
    constructor(props: IUserBoxListComponentProps) {
        super(props);

        // Defaul state
        this.state = {};

        // Binding functions to `this`
    }

    userList = () => {
        const { uid, goTo } = this.props;
        const users = this.props.users;
        const userBoxList: any[] = [];
        if (users) {
            users.forEach((user) => {
                const userId = user.get('userId') as string;
                if (uid !== userId) {
                    userBoxList.push(<UserBox key={userId} user={user} goTo={goTo} />);
                }
            });
        }
        return userBoxList;
    };

    /**
     * Reneder component DOM
     *
     */
    render() {
        return <div className="grid grid__1of4 grid__space-around">{this.userList()}</div>;
    }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any) => {
    return {
        goTo: (url: string) => dispatch(push(url)),
    };
};

/**
 * Map state to props
 */
const mapStateToProps = (state: any) => {
    const uid = state.getIn(['authorize', 'uid'], 0);
    return {
        uid,
    };
};

// - Connect component to redux store
export default connect<{}, {}, any, any>(mapStateToProps, mapDispatchToProps)(UserBoxListComponent as any);
