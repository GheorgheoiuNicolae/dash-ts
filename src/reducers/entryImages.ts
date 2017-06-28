import { BaseAction } from '../types';

interface EntryImagesState {
  isUploading: boolean;
  uploadProgress: null;
  uploadError: null;
  downloadError: null;
  images?: string[];
}

export default function reducer(state: EntryImagesState = {
    isUploading: false,
    uploadProgress: null,
    uploadError: null,
    downloadError: null,
    images: []
}, action: BaseAction) {
  switch(action.type) {
    case 'UPLOAD_PROGRESS': {
        return {...state, 
          isUploading: true, 
          uploadProgress: action.payload,
          uploadError: null,
          downloadError: null
        };
    }

    case 'UPLOAD_ERROR': {
        return {...state, 
          uploadProgress: null, 
          isUploading: false, 
          uploadError: action.payload,
          downloadError: null
        };
    }

    case 'UPLOAD_COMPLETE': {
      return {...state, 
        uploadProgress: null, 
        isUploading: false, 
        uploadError: false,
        downloadError: null
      };
    }

    case 'UPDATE_IMAGE_URL': {
      let images: any = state.images;
      // images.push({
      //   url: action.payload, 
      //   fileName: action.fileName
      // })
      // console.log('UPDATE_IMAGE_URL', images);
      return {...state, 
        uploadProgress: null, 
        isUploading: false,
        uploadError: false,
        downloadError: null,
        images: images
      };
    }

    case 'DOWNLOAD_IMAGE_ERROR': {
      return {...state, 
        uploadProgress: null, 
        isUploading: false, 
        uploadError: false, 
        downloadError: action.payload
      };
    }

    case 'REMOVE_IMAGE_FROM_STORE': {
      // let images = state.images;
      // let idx = images.indexOf(action.payload);
      // images.splice(idx, 1);

      return {...state,
        // images: images
      };
    }

    case 'REMOVE_IMAGE_FROM_STORE_AND_ENTRY': {
      // let payload = action.payload;
      // console.log('payload: ', payload, state);
      return {...state
      };
    }

    case 'CLEAR_IMAGES_FROM_STORE': {
      return {...state,
        images: []
      };
    }

    default: {
        return {...state};
    }
  }
}
