export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const validatePassword = (password: string) => {
  const re = /^.{6,10}$/;
  return re.test(password);
};

export function validateUsername(username: string) {
  // Kiểm tra không được để trống
  if (!username.trim()) {
    return {
      isValid: false,
      message: 'Tên không được để trống!',
    };
  }

  // Kiểm tra không được chứa ký tự đặc biệt
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialChars.test(username)) {
    return {
      isValid: false,
      message: 'Tên không nên chứa kí tự đặc biệt!',
    };
  }

  // Kiểm tra không trùng với email của người dùng
  // if (username === email) {
  //   return {
  //     isValid: false,
  //     message: 'Tên không được trùng với email đã đăng ký!',
  //   };
  // }

  // Kiểm tra không được quá ngắn hoặc quá dài
  const minLength = 3;
  const maxLength = 50;
  if (username.length < minLength || username.length > maxLength) {
    return {
      isValid: false,
      message:
        'Tên không nên quá dài hoặc quá ngắn (trong khoảng 3 - 50 kí tự)!',
    };
  }

  // Kiểm tra không được là đường dẫn, email hoặc địa chỉ
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlPattern = /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.[\w\d]+(\/.*)?$/;
  if (emailPattern.test(username) || urlPattern.test(username)) {
    return {
      isValid: false,
      message: 'Tên không được là đường dẫn hoặc địa chỉ email!',
    };
  }

  // Nếu tất cả điều kiện đều thoả mãn, trả về true
  return {
    isValid: true,
    message: 'Tên hợp lệ!',
  };
}
