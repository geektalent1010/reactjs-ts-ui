import { GalleryAPI } from 'api/GalleryAPI';
import { ImageGalleryActionType } from 'constants/imageGalleryActionType';
import { SocialError } from 'core/domain/common';
import { UserPermissionType } from 'core/domain/common/userPermissionType';
import { VideoFile } from 'core/domain/imageGallery';
import { Media } from 'core/domain/imageGallery/media';
import { Post } from 'core/domain/posts';
import { IImageGalleryService } from 'core/services/imageGallery/IImageGalleryService';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { fromJS, Map } from 'immutable';
import { DialogType } from 'models/common/dialogType';
import { FileResult, FileResultStatus } from 'models/files';
import moment from 'moment/moment';
import { END, eventChannel } from 'redux-saga';
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { provider } from 'socialEngine';
import config from 'config';
import { userActions } from 'store/actions';
import * as globalActions from 'store/actions/globalActions';
import * as imageGalleryActions from 'store/actions/imageGalleryActions';
import * as postActions from 'store/actions/postActions';
import * as serverActions from 'store/actions/serverActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import { authorizeSelector } from 'store/reducers/authorize';
import { gallerySelector } from 'store/reducers/imageGallery/gallerySelector';
import uuid from 'uuid';

/**
 * Get service providers
 */
const galleryService: IImageGalleryService = provider.get<IImageGalleryService>(SocialProviderTypes.ImageGalleryService)

/***************************** Subroutines ************************************/

/**
 * Creating channel event and subscribing upload storage service
 */
function createUploadChannel(file: any, fileName: string, folderName: string) {
  return eventChannel<FileResultStatus>((emmiter) => {
    const fileResultStatus = new FileResultStatus()
    const onProress = (percentage: number, status: boolean, fileName: string) => {
      fileResultStatus.progress = percentage
      fileResultStatus.fileName = fileName
      emmiter(fileResultStatus)
    }

    const onSuccess = (fileResult: FileResult, meta?: any) => {
      fileResultStatus.success = fileResult
      fileResultStatus.meta = meta
      emmiter(fileResultStatus)
      emmiter(END)
    }

    const onFailure = (error: SocialError) => {
      fileResultStatus.error = error
      emmiter(fileResultStatus)
      emmiter(END)
    }
    galleryService.uploadFile(folderName, file, fileName, onProress, onSuccess, onFailure)
    return () => {
    }
  })
}

/**
 * Fetch image gallery
 */
function* dbFetchImageGallery(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const images = yield call(galleryService.getGallery, uid, config.data.imageFolderPath)
      yield put(imageGalleryActions.addImageList(images))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Delete video from gallery on server
 */
function* dbDeleteVideo(videoId: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(galleryService.deleteFile, uid, videoId, config.data.videoFolderPath)
      yield put(imageGalleryActions.deleteVideo(videoId))

    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Delete image on server
 */
function* dbDeleteImage(fileId: string, folderName: string, fileName: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      yield call(galleryService.deleteFile, uid, fileId, folderName)
      yield put(imageGalleryActions.deleteImage(fileId))

    } catch (error) {
      yield put(globalActions.showMessage(error.message))

    }
  }
}

/**
 * Save video information on server
 */
function* dbSaveVideo(videoURL: string, thumbnail: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {


    const newVideo = new Media(
      uuid.v4(),
      0,
      moment.utc().valueOf(),
      thumbnail,
      videoURL,
      thumbnail,
      '',
      config.data.avatarFolderPath,
      thumbnail,
      uid!,
      0,
      '',
      0,
      0,
      '',
      false,
      [],
      UserPermissionType.Public,
    )
    const mediaId = yield call(galleryService.saveFile, uid, newVideo,config.data.videoFolderPath)
    newVideo.objectId = mediaId
    yield put(imageGalleryActions.addVideo(newVideo))
  }
}

/**
 * Fetch video gallery
 */
function* dbUploadVideo(file: any, fileName: string, thumbnail: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {

    const folderName = `${uid}/${config.data.videoFolderPath}`
    const uploadFileChannel = yield call(createUploadChannel, file, fileName, folderName)

    while (true) {
      const { progress = 0, success, error } = yield take<FileResultStatus>(uploadFileChannel)
      if (error) {

        yield put(globalActions.showMessage(error.message))
        yield put(globalActions.progressChange(100, false))
        yield put(globalActions.hideTopLoading())
        return
      }

      if (success) {
        yield call(dbSaveVideo, success.fileURL, thumbnail)
        yield put(globalActions.progressChange(100, false))
        yield put(globalActions.hideTopLoading())
        return
      }

      yield put(globalActions.progressChange(progress, true))

    }
  }
}

/**
 * Fetch video gallery
 */
function* dbUploadVideoThumbnail(file: any, fileName: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {

    const folderName = `${uid}/${config.data.videoThumbnailPath}`
    const uploadFileChannel = yield call(createUploadChannel, file, fileName, folderName)

    while (true) {
      const { progress = 0, success, error } = yield take<FileResultStatus>(uploadFileChannel)
      if (error) {

        yield put(globalActions.showMessage(error.message))
        yield put(globalActions.progressChange(100, false))
        yield put(globalActions.hideTopLoading())
        return
      }

      if (success) {
        yield put(globalActions.progressChange(100, false))

        yield put(globalActions.hideTopLoading())

        return success
      }

      yield put(globalActions.progressChange(progress, true))

    }
  }
}

/**
 * Fetch video gallery
 */
function* dbFetchVideoGallery(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    try {
      const videos = yield call(galleryService.getGallery, uid, config.data.videoFolderPath)
      yield put(imageGalleryActions.addVideoList(videos))
    } catch (error) {
      yield put(globalActions.showMessage(error.message))
    }
  }
}

/**
 * Upload image
 */
function* dbUploadImage(file: any, rootName: string, fileName: string) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {

    const folderName = `${uid}/${rootName}`
    const uploadFileChannel = yield call(createUploadChannel, file, fileName, folderName)

    while (true) {
      const { progress = 0, success, error, meta } = yield take<FileResultStatus>(uploadFileChannel)
      if (error) {

        yield put(globalActions.showMessage(error.message))
        yield put(globalActions.progressChangeWithKey(100, false, fileName))
        yield put(globalActions.hideTopLoading())
        return
      }

      if (success) {
        yield put(globalActions.progressChangeWithKey(100, false, fileName, meta))

        yield put(globalActions.hideTopLoading())

        return success
      }

      yield put(globalActions.progressChangeWithKey(progress, true, fileName))

    }
  }
}

/**
 * Fetch album images 
 */
function* fetchAlbumImages(userId: string, albumId: string, lastImageId?: string, limit: number = 10) {

  const lastImage = yield select(gallerySelector.getAlbumLastImageId, { albumId })
  const result: { mappedImages: Map<string, any>, ids: Map<string, boolean>, newLastImageId: string } =
    yield call(galleryService.fetchAlbumImages, userId, albumId, limit, lastImage)
  const imageCount = result.mappedImages.count()

  yield put(imageGalleryActions.setLastAlbumImage(albumId, result.newLastImageId))

  if (!(imageCount > (limit - 1))) {
    yield put(imageGalleryActions.albumHasNoMoreImage(albumId))
  }
  if (imageCount > 0) {
    yield put(imageGalleryActions.addImageList(result.mappedImages))
    yield put(imageGalleryActions.addAlbumImages(albumId, result.ids))
  }
}

/**
 * Fetch avatar images 
 */
function* fetchAvatarImages(userId: string, albumId: string, lastImageId?: string, limit: number = 10) {
  const result: { mappedImages: Map<string, any>, ids: Map<string, boolean>, newLastImageId: string } = yield call(galleryService.getGallery, userId,config.data.avatarFolderPath)
  const imageCount = result.mappedImages.count()
  if (!(imageCount > (limit - 1))) {
    //  yield put(imageGalleryActions.albumHasNoMoreImage(albumId))
  }
  if (imageCount > 0) {
    yield put(imageGalleryActions.addImageList(result.mappedImages))
    yield put(imageGalleryActions.addAvatarImages(userId, result.ids))
  }
}

/**
 * Fetch cover images 
 */
function* fetchCoverImages(userId: string, albumId: string, lastImageId?: string, limit: number = 10) {
  const result: { mappedImages: Map<string, any>, ids: Map<string, boolean>, newLastImageId: string } = yield call(galleryService.getGallery, userId,config.data.coverFolderPath)
  const imageCount = result.mappedImages.count()

  if (!(imageCount > (limit - 1))) {
    //  yield put(imageGalleryActions.albumHasNoMoreImage(albumId))
  }
  if (imageCount > 0) {
    yield put(imageGalleryActions.addImageList(result.mappedImages))
    yield put(imageGalleryActions.addCoverImages(userId, result.ids))
  }
}

/**
 * Save album
 */
function* saveAlbum(uid: string, albumPost: Post, images: Media[]) {

  const albumImages: { newAlbum: Map<string, any>, imageIds: Map<string, boolean>, images: Map<string, any> } =
    yield call(galleryService.setPhotoAlbum, uid, config.data.imageFolderPath, albumPost, images)

  yield put(globalActions.closeDialog(DialogType.PostWrite))
  yield put(imageGalleryActions.addImageList(albumImages.images))
  yield put(postActions.addPost(albumImages.newAlbum))
  yield put(userActions.addProfileAlbums(uid, Map({ [albumImages.newAlbum.get('id')]: true })))
  yield put(imageGalleryActions.addAlbumImages(albumImages.newAlbum.get('id'), albumImages.imageIds))
  yield put(postActions.addStreamPosts(Map({ [albumImages.newAlbum.get('id')]: true })))
  yield put(globalActions.closeDialog(DialogType.Album))
  const createAlbumRequest = GalleryAPI.createAlbumRequest(uid)
  createAlbumRequest.status = ServerRequestStatusType.OK
  yield put(serverActions.sendRequest(createAlbumRequest))

}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

/**
 * Watch upload video
 */
function* watchUploadVideo(action: { type: ImageGalleryActionType, payload: any }) {
  const { file, fileName, thumbnail } = action.payload
  const prefix = 'thumbnail_'
  const thumbnailFileName = prefix + fileName
  const videoThumbnail = yield call(dbUploadVideoThumbnail, thumbnail, thumbnailFileName)

  yield call(dbUploadVideo, file, fileName, videoThumbnail.fileURL)
}

/**
 * Watch fetch album images
 */
function* watchFetchAlbumImages(action: { type: ImageGalleryActionType, payload: any }) {
  const { userId, albumId } = action.payload
  const lastImageId = yield select(gallerySelector.getAlbumLastImageId, { albumId })
  yield call(fetchAlbumImages, userId, albumId, lastImageId, 10)
}

/**
 * Watch fetch avatar images
 */
function* watchFetchAvatarImages(action: { type: ImageGalleryActionType, payload: any }) {
  const { userId } = action.payload
  const lastImageId = '' 
  yield call(fetchAvatarImages, userId, 'avatar', lastImageId, 100)
}

/**
 * Watch fetch cover images
 */
function* watchFetchCoverImages(action: { type: ImageGalleryActionType, payload: any }) {
  const { userId } = action.payload
  const lastImageId = ''
  yield call(fetchCoverImages, userId, 'cover', lastImageId, 100)
}

/**
 * Watch upload image
 */
function* watchUploadImage(action: { type: ImageGalleryActionType, payload: any }) {
  const { file, fileName } = action.payload
  yield call(dbUploadImage, file, config.data.imageFolderPath, fileName)
}

/**
 * Watch upload avatar
 */
function* watchUploadAvatar(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  const { file, fileName } = action.payload
  yield put(globalActions.showTopLoading())
  const result = yield call(dbUploadImage, file, config.data.avatarFolderPath, fileName)
  
  yield put(globalActions.hideTopLoading())
  const { fileURL } = result
  const fileId = (fileName as string).split('.')[0]
  const newAvatar = new Media(
    fileId,
    0,
    moment.utc().valueOf(),
    fileURL,
    fileURL,
    fileName,
    '',
    config.data.avatarFolderPath,
    fileName,
    uid!,
    0,
    '',
    0,
    0,
    '',
    false,
    [],
    UserPermissionType.Public,
  )
  const mediaId = yield call(galleryService.saveFile, uid, newAvatar,config.data.avatarFolderPath)
  newAvatar.objectId = mediaId
  const mapImage = Map({ [fileId]: fromJS({ ...newAvatar }) })
  yield put(imageGalleryActions.addImageList(mapImage))
  yield put(imageGalleryActions.addAvatarImages(uid, Map({ [fileId]: true })))

}

/**
 * Watch upload cover
 */
function* watchUploadCover(action: { type: ImageGalleryActionType, payload: any }) {
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  const { file, fileName } = action.payload
  yield put(globalActions.showTopLoading())
  const result = yield call(dbUploadImage, file, config.data.coverFolderPath, fileName)
  yield put(globalActions.hideTopLoading())
  const { fileURL } = result
  const fileId = (fileName as string).split('.')[0]
  const newCover = new Media(
    fileId,
    0,
    moment.utc().valueOf(),
    fileURL,
    fileURL,
    fileName,
    '',
    config.data.coverFolderPath,
    fileName,
    uid!,
    0,
    '',
    0,
    0,
    '',
    false,
    [],
    UserPermissionType.Public,
  )
   const mediaId = yield call(galleryService.saveFile, uid, newCover,config.data.coverFolderPath)
    newCover.objectId = mediaId
  const mapImage = Map({ [fileId]: fromJS({ ...newCover }) })
  yield put(imageGalleryActions.addImageList(mapImage))
  yield put(imageGalleryActions.addCoverImages(uid, Map({ [fileId]: true })))
}

/**
 * Watch create album
 */
function* watchCreateAlbum(action: { type: ImageGalleryActionType, payload: any }) {
  const { albumPost, images } = action.payload
  let authedUser: Map<string, any> = yield select(authorizeSelector.getAuthedUser)
  const uid = authedUser.get('uid')
  if (uid) {
    const createAlbumRequest = GalleryAPI.createAlbumRequest(uid)
    yield put(serverActions.sendRequest(createAlbumRequest))
    try {
      yield call(saveAlbum, uid, albumPost, images)

    } catch (error) {
      createAlbumRequest.status = ServerRequestStatusType.Error
      yield put(serverActions.sendRequest(createAlbumRequest))
      yield put(globalActions.showMessage(`gallerySaga/watchCreateAlbum  ${error}`))
      console.trace(`error`, error)
    }
  }
}

/**
 * Watch delete video from gallery
 */
function* watchDeleteVideo(action: { type: ImageGalleryActionType, payload: any }) {
  const { videoId } = action.payload
  yield call(dbDeleteVideo, videoId)
}

/**
 * Watch delete image
 */
function* watchDeleteImage(action: { type: ImageGalleryActionType, payload: any }) {
  const { fileId, folderName, fileName } = action.payload
  yield call(dbDeleteImage, fileId, folderName, fileName)
}

export default function* gallerySaga() {
  yield all([
    takeLatest(ImageGalleryActionType.DB_FETCH_IMAGE_GALLERY, dbFetchImageGallery),
    takeLatest(ImageGalleryActionType.DB_FETCH_ALBUM_IMAGES, watchFetchAlbumImages),
    takeLatest(ImageGalleryActionType.DB_FETCH_AVATAR_IMAGES, watchFetchAvatarImages),
    takeLatest(ImageGalleryActionType.DB_FETCH_COVER_IMAGES, watchFetchCoverImages),
    takeLatest(ImageGalleryActionType.DB_DELETE_IMAGE, watchDeleteImage),
    takeLatest(ImageGalleryActionType.DB_UPLOAD_VIDEO, watchUploadVideo),
    takeEvery(ImageGalleryActionType.DB_UPLOAD_IMAGE, watchUploadImage),
    takeEvery(ImageGalleryActionType.DB_UPLOAD_AVATAR, watchUploadAvatar),
    takeEvery(ImageGalleryActionType.DB_UPLOAD_COVER, watchUploadCover),
    takeLatest(ImageGalleryActionType.DB_CREATE_ALBUM, watchCreateAlbum),
    takeLatest(ImageGalleryActionType.DB_FETCH_VIDEO_GALLERY, dbFetchVideoGallery),
    takeLatest(ImageGalleryActionType.DB_DELETE_VIDEO, watchDeleteVideo),
  ])
}