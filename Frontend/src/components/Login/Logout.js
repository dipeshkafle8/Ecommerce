const Logout = ({ setUser }) => {
  localStorage.removeItem("token");
  localStorage.removeItem("User");
  setUser(null);
  return true;
};
export default Logout;
