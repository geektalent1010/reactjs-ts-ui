// - Import react components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FileAPI from 'api/FileAPI';
import AlbumDialogComponent from 'components/albumDialog/AlbumDialogComponent';
import PhotoStreamComponent from 'components/photoStream';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import UserAvatarComponent from 'components/userAvatar/UserAvatarComponent';
import uuid from 'uuid';

import { connectPhotoMaster } from './connectPhotoMaster';
import { IPhotoMasterProps } from './IPhotoMasterProps';
import { IPhotoMasterState } from './IPhotoMasterState';
import { photoMasterStyles } from './photoMasterStyles';
import { log } from 'utils/log';
import { defaultNoValue } from 'utils/errorHandling';

// - Material-UI
// - Import app components
// - Import API
// - Import actions
// - Create component class
export class PhotoMasterComponent extends Component<IPhotoMasterProps & WithTranslation, IPhotoMasterState> {
    static propTypes = {
        /**
         * A list of post
         */
        posts: PropTypes.object,

        /**
         * The title of home header
         */
        homeTitle: PropTypes.string,
    };

    /**
     * Selected photos
     */
    selectedPhotos: { file: any; fileName: string }[] = [];

    /**
     * Handle close menu
     */
    handleCloseMenu = () => {
        this.setState({
            anchorElMenu: null,
        });
    };

    /**
     * Handle open menu
     */
    handleOpenMenu = (event: any) => {
        this.setState({
            anchorElMenu: event.currentTarget,
        });
    };

    /**
     * Close album dialog
     */
    closeAlbumDialog = () => {
        const { closeAlbum } = this.props;
        if (closeAlbum) {
            closeAlbum();
        }
    };

    /**
     * Open album dialog
     */
    openAlbumDialog = () => {
        const { openAlbum } = this.props;
        if (openAlbum) {
            openAlbum();
        }
    };

    /**
     * Handle on change file upload
     */
    onUploadAlbumChange = (event: any) => {
        const { uploadImage } = this.props;
        if (uploadImage) {
            const files: File[] = event.currentTarget.files;
            const parsedFiles: { file: any; fileName: string }[] = [];
            for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
                const file = files[fileIndex];
                const extension = FileAPI.getExtension(file.name);
                const fileName = `${uuid()}.${extension}`;
                parsedFiles.push({ file: URL.createObjectURL(file), fileName });
                uploadImage(file, fileName);
            }
            this.selectedPhotos = parsedFiles;
            this.openAlbumDialog();
            event.currentTarget.value = null;
        }
    };

    /**
     * Component constructor
     *
     */
    constructor(props: IPhotoMasterProps & WithTranslation) {
        super(props);

        this.state = {
            anchorElMenu: null,
        };

        // Binding functions to `this`
        this.loadData = this.loadData.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleDeleteAlbum = this.handleDeleteAlbum.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
    }

    /**
     * Handle delete image
     */
    handleDeleteImage = (fileId: string) => {
        const { updateAlbum, currentAlbum, images } = this.props;
        if (
            currentAlbum &&
            currentAlbum.album &&
            currentAlbum.album.photos &&
            updateAlbum &&
            images &&
            images.length > 0
        ) {
            const updatedImages: { url: string; fileId: string; fileName: string }[] = [];
            images.slice(0, 4).forEach((image) => {
                if (image.id !== fileId) {
                    updatedImages.push({
                        url: image.url,
                        fileId: image.id,
                        fileName: image.fileName,
                    });
                }
            });
            currentAlbum.album.photos = updatedImages.map((image) => image.url);
            if (updatedImages.length > 0) {
                currentAlbum.image = updatedImages[0].url;
                currentAlbum.album.cover = updatedImages[0].url;
                currentAlbum.album.coverId = updatedImages[0].fileId;
            } else {
                currentAlbum.image = '';
                currentAlbum.album.cover = '';
                currentAlbum.album.coverId = '';
            }
            updateAlbum(fromJS({ ...currentAlbum }), () => {
                log.info('Album Deleted!');
            });
        }
    };

    /**
     * Handle delete album
     */
    handleDeleteAlbum = () => {
        const { deleteAlbum, currentAlbum } = this.props;
        if (deleteAlbum && currentAlbum && currentAlbum.id) {
            deleteAlbum(currentAlbum.id);
            this.setState({
                anchorElMenu: null,
            });
        }
    };

    /**
     * Load posts
     */
    loadData() {
        const { loadImages, loadAlbum } = this.props;
        if (loadImages && loadAlbum) {
            loadAlbum();
            loadImages();
        }
    }

    componentDidMount() {
        const { setHomeTitle, t } = this.props;
        if (setHomeTitle && t) {
            setHomeTitle(t('header.home'));
        }
        this.loadData();
    }
    /**
     * Reneder component DOM
     *
     */
    render() {
        const { images, t, classes, currentAlbum, albumDialogOpen, isOwner, progress } = this.props;
        const { anchorElMenu } = this.state;
        const album = currentAlbum && currentAlbum.album ? currentAlbum.album : { title: '' };
        const albumOpen = albumDialogOpen !== undefined ? albumDialogOpen : false;
        if (!t) {
            return <div />;
        }
        const rightIconMenu = (
            <div>
                <IconButton
                    aria-owns={anchorElMenu ? 'circle-menu' : ''}
                    aria-haspopup="true"
                    onClick={this.handleOpenMenu}
                >
                    <MoreVertIcon />
                </IconButton>

                <Popover
                    id="current-user-menu-root"
                    anchorEl={anchorElMenu}
                    open={Boolean(anchorElMenu)}
                    onClose={this.handleCloseMenu}
                    PaperProps={{
                        style: {
                            maxHeight: 200 * 4.5,
                            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)',
                        },
                    }}
                >
                    <MenuList role="menu">
                        <MenuItem onClick={this.handleDeleteAlbum}> {t('album.deleteAlbum')} </MenuItem>
                    </MenuList>
                </Popover>
            </div>
        );

        const cardActions = (
            <CardActions>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="album-button-file"
                    multiple
                    onChange={this.onUploadAlbumChange}
                    type="file"
                />
                <div className={classes.header}>
                    <label htmlFor="album-button-file">
                        <Button component="span" color="primary">
                            <PhotoAlbumIcon />
                            {t('album.addPhotos')}
                        </Button>
                    </label>
                </div>
            </CardActions>
        );

        const renderAlbum = (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <UserAvatarComponent
                                fileName={currentAlbum && currentAlbum.image ? currentAlbum.image : ''}
                                fullName={album.title}
                            />
                        }
                        action={isOwner && rightIconMenu}
                        title={album.title}
                        subheader={currentAlbum && currentAlbum.body ? currentAlbum.body : ''}
                    />

                    {isOwner && cardActions}

                    <CardContent>
                        <PhotoStreamComponent
                            loadPhotos={this.loadData}
                            onDelete={this.handleDeleteImage}
                            images={images}
                            currentAlbum={defaultNoValue(currentAlbum, {})}
                        />
                    </CardContent>
                </Card>
                {albumOpen ? (
                    <AlbumDialogComponent
                        currentAlbum={currentAlbum}
                        open={albumOpen}
                        progress={defaultNoValue(progress, {})}
                        photos={this.selectedPhotos}
                        onClose={this.closeAlbumDialog}
                    />
                ) : (
                    ''
                )}
            </div>
        );

        if (currentAlbum && Object.keys(currentAlbum).length > 0) {
            return renderAlbum;
        } else {
            return (
                <Paper className={classes.noAlbumRoot}>
                    <VisibilityOffIcon className={classes.noAlbumIcon} />
                    <Typography variant="body1" className={classes.noAlbumText}>
                        {t('album.noExistAlbum')}
                    </Typography>
                </Paper>
            );
        }
    }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(PhotoMasterComponent);

export default withRouter<any, any>(
    connectPhotoMaster(withStyles(photoMasterStyles as any)(translateWrapper as any) as any),
);
