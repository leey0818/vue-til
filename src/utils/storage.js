const saveAuth = token => {
  localStorage.setItem('til_auth', token);
};

const getAuth = () => {
  return localStorage.getItem('til_auth');
};

const saveUser = name => {
  localStorage.setItem('til_user', name);
};

const getUser = () => {
  return localStorage.getItem('til_user');
};

export { saveAuth, saveUser, getAuth, getUser };
