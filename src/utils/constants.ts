export const SUCCESS_CODE = 1000;
export const PARAM_ERROR = 1003;
export const INPUT_ERROR = 1004;
export const IMAGE_ERROR = 1005;
export const LOAD_IMAGE_ERROR = 1006;
export const INVALID_TOKEN = 9998;
export const BUG_SERVER = 5001;
export const USER_INVALID = 9995;
export const POST_NOT_EXIST = 9992;
export const USER_NOT_REQUEST_FRIEND = 9994;
export const USER_IS_BLOCKED = 3001;
export const NETWORK_ERROR = 9999;
export const errors: any = {
  [USER_NOT_REQUEST_FRIEND]: 'Không thấy dữ liệu!',
  [PARAM_ERROR]: 'Truyền body lỗi, xem lại code hoặc api.',

  [INPUT_ERROR]: 'Cần validate input trước khi gửi lên server!',
  [IMAGE_ERROR]: 'Truyền ảnh lỗi, xem lại code hoặc api.',
  [LOAD_IMAGE_ERROR]: 'Tải ảnh thất bại!',

  [POST_NOT_EXIST]: 'Bài viết không tồn tại hoặc đã bị khóa!',
  [USER_INVALID]: 'Người dùng không hợp lệ hoặc đã bị khóa.',
  [BUG_SERVER]: 'Server lỗi!',
  [INVALID_TOKEN]: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
  [USER_IS_BLOCKED]: 'Người dùng đã bị chặn bởi bạn.',
  [NETWORK_ERROR]: 'Vui lòng kiểm tra lại mạng!',
};

// COINS:
export const MIN_COINS = 10;
