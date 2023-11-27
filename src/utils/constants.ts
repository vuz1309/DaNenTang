export const SUCCESS_CODE = 1000;
export const INVALID_TOKEN = 9998;
export const BUG_SERVER = 5001;
export const USER_INVALID = 9995;
export const POST_NOT_EXIST = 9992;
export const USER_NOT_REQUEST_FRIEND = 9994;
export const USER_IS_BLOCKED = 3001;
export const errors: any = {
  [USER_NOT_REQUEST_FRIEND]: 'Đối phương đã hủy yêu cầu kết bạn!',
  [POST_NOT_EXIST]: 'Bài viết không tồn tại!',
  [USER_INVALID]: 'Người dùng không hợp lệ hoặc đã bị khóa.',
  [BUG_SERVER]: 'Server lỗi!',
  [INVALID_TOKEN]: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
  [USER_IS_BLOCKED]: 'Người dùng đã bị chặn bởi bạn.',
};
