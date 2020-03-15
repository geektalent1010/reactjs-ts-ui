// - Import react components
import UserBoxList from 'components/userBoxList/UserBoxListComponent';
import { Circle } from 'core/domain/circles';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IFollowingComponentProps } from './IFollowingComponentProps';
import { IFollowingComponentState } from './IFollowingComponentState';

// - Import app components
// - Import API
// - Import actions

/**
 * Create component class
 */
export class FollowingComponent extends Component<IFollowingComponentProps,IFollowingComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   *
   */
  constructor (props: IFollowingComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * 
   */
  render () {
    const {t} = this.props
    const followingUsers = this.props.followingUsers!
    return (
          <div>
            {(followingUsers && followingUsers.keySeq().count() !== 0 ) ? (<div>
              <div className='profile__title'>
                {t!('people.followingLabel')}
                        </div>
                        <UserBoxList users={followingUsers} />
              <div style={{ height: '24px' }}></div>

              </div>) : (<div className='g__title-center'>
                 {t!('people.noFollowingLabel')}
               </div>)}
          </div>
    )
  }
}

  /**
   * Map dispatch to props
   */
const mapDispatchToProps = (dispatch: any,ownProp: IFollowingComponentProps) => {
  return{

  }
}

  /**
   * Map state to props
   */
const mapStateToProps = (state: Map<string, any>,ownProps: IFollowingComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'], 0)
  const circles: { [circleId: string]: Circle } = state.getIn(['circle', 'circleList'], {})
  const followingUsers = state.getIn(['circle', 'userTies'], {})
  return {
    
    uid,
    circles,
    followingUsers

  }
}

  // - Connect component to redux store
const translateWrapper = withTranslation('translations')(FollowingComponent as any)

export default connect(mapStateToProps,mapDispatchToProps)(translateWrapper)
