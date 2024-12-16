// import Cookies from "js-cookie";

// const storeAccessToken = (role, token, expiresInMinutes = 13) => {
//   if (!role || !token) {
//     console.error("Role and token are required to store the access token.");
//     return;
//   }
//   Cookies.set(`${role}_access_token`, token, { expires: 7 });

//   console.log(`${role}_access_token stored successfully with a ${expiresInMinutes}-minute expiry.`);
// };

// export default storeAccessToken;


// Consider using a more secure method like HttpOnly cookies
// or implementing a token refresh mechanism
const storeAccessToken = (role, token) => {
    // Implement secure token storage
    localStorage.setItem(`${role}Token`, token);
  };
  
  const removeAccessToken = (role) => {
    localStorage.removeItem(`${role}Token`);
  };