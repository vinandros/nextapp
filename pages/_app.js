import firebase, { FireBaseContext } from "../firebase";
import useAuthentication from "../hooks/useAuthentication";

function MyApp({ Component, pageProps }) {
  const user = useAuthentication();
  return (
    <FireBaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...pageProps} />
    </FireBaseContext.Provider>
  );
}

export default MyApp;
