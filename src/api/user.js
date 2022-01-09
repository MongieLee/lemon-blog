import request from '@/helpers/request';

const URL = {
  UPDATE: '/user',
};

export default {
  update(data) {
    return request(URL.UPDATE, 'PATCH', data);
  },
};
