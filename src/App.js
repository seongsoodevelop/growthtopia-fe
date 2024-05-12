import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authGreeting } from "#redux/modules/auth";

import { Auth, Home, NotFound } from "#pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authGreeting({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
