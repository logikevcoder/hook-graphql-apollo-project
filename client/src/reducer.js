export default function reducer(state, { type, payload }) {
  // destructure these 2 props off action
  switch (type) {
    case 'LOGIN_USER':
      return { ...state, currentUser: payload };
    default:
      return state;
  }
}
