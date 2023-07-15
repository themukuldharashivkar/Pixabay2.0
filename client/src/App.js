import { Route, Routes } from "react-router-dom";
import { HomeContainer } from "./container";
import { Header, MainLoader } from "./components";
import { useEffect, useState } from "react";
import { firebaseAuth } from "./config/firebase.config";
import { createNewUser } from "./sanity";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";

function App() {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((result) => {
      if (result) {
        console.log("user", result?.providerData[0]);
        createNewUser(result?.providerData[0]).then(() => {
          console.log("new user created");
          dispatch(SET_USER(result?.providerData[0]));
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        });
      }
    });
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      {isloading ? (
        <MainLoader />
      ) : (
        <>
          {/* header */}
          <Header />

          {/* main content sections */}
          <main className="w-full h-full flex items-center justify-center">
            {/* routes */}
            <Routes>
              <Route path="/*" element={<HomeContainer />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
