const Enum = {
  PostMode: {
    Edit: 1,
    Create: 2,
  },
  AccountStatus: {
    VALID: 1,
    NOT_CHANGE_AFTER_SIGNUP: -1,
    NOT_VERIFY: 0,
  },
  Feel: {
    UN_FEEL: '-1',
    LIKE: '0',
    DISLIKE: '1',
  },
  NotiType: {
    FriendRequest: 1,
    FriendAccepted: 2,
    PostAdded: 3,
    PostUpdated: 4,
    PostFelt: 5,
    PostMarked: 6,
    MarkCommented: 7,
    VideoAdded: 8,
    PostCommented: 9,
  },
  ThumnailMode: {
    Navigate: 1,
    Play: 2,
  },
};
export default Enum;
