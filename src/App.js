import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authSessionHi } from "#redux/modules/auth";

import { Auth, Meta, Home, NotFound } from "#pages";
import Workspace from "#pages/Plan";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authSessionHi({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/meta/*" element={<Meta />} />
          <Route path="/workspace/*" element={<Workspace />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
