export default {
  isLogined({ username, token }) {
    return username !== '' && token !== '';
  },
};
