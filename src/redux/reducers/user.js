const initialState = {
  userName: '',
  password: '',
};

const loggedUser = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        userName: action.payload.userName,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
