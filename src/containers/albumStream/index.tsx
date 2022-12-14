// - Import react components
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withStyles from '@material-ui/core/styles/withStyles';
import NoAlbumIcon from '@material-ui/icons/SettingsSystemDaydream';
import StringAPI from 'api/StringAPI';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { User } from 'core/domain/users/user';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadMoreProgressComponent from 'layouts/loadMoreProgress';
import PictureDialogComponent from 'layouts/pictureDialog';
import * as globalActions from 'store/actions/globalActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';

import { albumStreamStyles } from './albumStreamStyles';
import { IAlbumStreamProps } from './IAlbumStreamProps';
import { IAlbumStreamState } from './IAlbumStreamState';
import { userGetters } from 'store/reducers/users/userGetters';

export class AlbumStreamComponent extends Component<IAlbumStreamProps & WithTranslation, IAlbumStreamState> {
    /**
     * Feilds
     */
    nextPage = 0;

    /**
     * Component constructor
     *
     */
    constructor(props: IAlbumStreamProps & WithTranslation) {
        super(props);

        this.state = {
            /**
             * The title of home header
             */
            homeTitle: props.homeTitle || '',

            /**
             * If there is more post to show {true} or not {false}
             */
            hasMorePosts: true,

            /**
             * List of posts
             */
            posts: [],

            /**
             * Stream length
             */
            prevPosts: Map({}),

            /**
             * The images from album
             */
            pictureDialogImages: [],

            /**
             * Wether picture dialog is open
             */
            picutreDialogOpen: false,
        };

        // Binding functions to `this`
        this.loader = this.loader.bind(this);
        this.albumList = this.albumList.bind(this);
        this.gridTile = this.gridTile.bind(this);
        this.closePictureDialog = this.closePictureDialog.bind(this);
        this.openPictureDialog = this.openPictureDialog.bind(this);
        this.hanleClickAlbum = this.hanleClickAlbum.bind(this);
    }

    /**
     * Loader
     */
    loader = () => {
        const { streamRequestStatus } = this.props;
        const { loadStream } = this.props;
        if (loadStream && streamRequestStatus && streamRequestStatus !== ServerRequestStatusType.Sent) {
            loadStream(this.nextPage);
            this.nextPage++;
        }
    };

    /**
     * Open picture dialog
     */
    openPictureDialog = (images: string[]) => {
        this.setState({
            pictureDialogImages: images,
            picutreDialogOpen: true,
        });
    };

    /**
     * Handle click album
     */
    hanleClickAlbum = (postId: string) => {
        const { userId, goTo } = this.props;

        if (userId && goTo) {
            goTo(`/u/${userId}/album/${postId}`);
        }
    };

    /**
     * Close picture dialog
     */
    closePictureDialog = () => {
        this.setState({
            pictureDialogImages: [],
            picutreDialogOpen: false,
        });
    };

    /**
     * Image list
     */
    albumList = () => {
        const { classes, posts } = this.props;
        return posts.map((post) => {
            if (!post) {
                return <div />;
            }
            const imgSrc = post.get('image');
            return (
                <GridListTile
                    key={`album-dialog-tile-${post.get('id')}`}
                    cols={1}
                    classes={{ tile: classNames({ [classes.noAlbum]: StringAPI.isEmpty(imgSrc) }) }}
                >
                    {!StringAPI.isEmpty(imgSrc) ? (
                        <img alt="" src={imgSrc} onClick={() => this.hanleClickAlbum(post.get('id'))} />
                    ) : (
                        <div>
                            <NoAlbumIcon className={classes.noAlbumIcon} />
                        </div>
                    )}
                    <GridListTileBar
                        title={post.getIn(['album', 'title'], '')}
                        subtitle={post.getIn(['body'], '')}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                    />
                </GridListTile>
            );
        });
    };

    /**
     * Render Grid tile
     */
    gridTile = () => {
        const { classes } = this.props;
        const albumList = this.albumList();
        return (
            <div className={classes.gridTileRoot}>
                <GridList cellHeight={202} cols={3} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}></GridListTile>
                    {albumList.count() > 0 && albumList}
                </GridList>
            </div>
        );
    };

    componentDidMount() {
        this.loader();
    }

    /**
     * Reneder component DOM
     *
     */
    render() {
        const { hasMoreAlbum, classes, posts } = this.props;
        const { picutreDialogOpen, pictureDialogImages } = this.state;

        return (
            <div id="scrollableAlbum" style={{ height: 300, overflow: 'auto' }}>
                <InfiniteScroll
                    dataLength={posts ? posts.count() : 0}
                    next={this.loader}
                    hasMore={hasMoreAlbum || false}
                    endMessage={''}
                    scrollableTarget="scrollableAlbum"
                    loader={<LoadMoreProgressComponent key="stream-load-more-progress" />}
                >
                    <div className={classes.container}>{this.gridTile()}</div>
                </InfiniteScroll>
                <PictureDialogComponent
                    open={picutreDialogOpen}
                    onClose={this.closePictureDialog}
                    images={pictureDialogImages}
                />
            </div>
        );
    }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any) => {
    return {
        showTopLoading: () => dispatch(globalActions.showTopLoading()),
        hideTopLoading: () => dispatch(globalActions.hideTopLoading()),
        goTo: (url: string) => dispatch(push(url)),
    };
};

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IAlbumStreamProps) => {
    const uid = state.getIn(['authorize', 'uid']);
    const currentUser = userGetters.getUserProfileById(state, { userId: uid }).toJS() as User;
    const streamRequestStatus = state.getIn(['server', 'request', ownProps.requestId]);
    return {
        streamRequestStatus: streamRequestStatus ? streamRequestStatus.status : ServerRequestStatusType.NoAction,

        avatar: currentUser.avatar || '',
        fullName: currentUser.fullName || '',
        currentUser,
    };
};

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(AlbumStreamComponent);

export default withRouter<any, any>(
    connect<any>(
        mapStateToProps as any,
        mapDispatchToProps,
    )(withStyles(albumStreamStyles as any)(translateWrapper as any)),
);
