import { List } from 'immutable';
import { Image } from 'core/domain/imageGallery';

/**
 * ImageGallery state
 * 
 * @export
 * @class ImageGalleryState
 */
export class ImageGalleryState  {
    
      /**
       * Image gallery is open {true} or not {false}
       * 
       * @type {Boolean}
       * @memberof ImageGalleryState
       */
      status: Boolean = false

      /**
       * The list of image
       */
      images: List<Image> = List()

      /**
       * Selected image name
       */
      selectImage: string = ''

      /**
       * Selected image address
       */
      selectURL: string = ''

      /**
       * If image gallery is loaded {true} or not false
       */
      loaded: Boolean = false

      /**
       * Images address list
       */
      imageURLList: any = {}

      /**
       * Store image requested
       */
      imageRequests: any = {}
    
    }