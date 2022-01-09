import request from '@/helpers/request';
import axios from 'axios';
const URL = {
  UPLOAD_FILE: '/file/uploadFile',
  GET_DETAIL: '/blog/:blogId',
  CREATE: '/blog',
  UPDATE: '/blog/:blogId',
  DELETE: '/blog/:blogId',
};

export default {
  uploadFile(file) {
    return axios({
      url: URL.UPLOAD_FILE,
      method: 'POST',
      data: file,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).catch((err) => {
      console.log(err);
    });
  },
};
