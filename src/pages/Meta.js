import { NotFound } from "#containers";
import { Play } from "#containers/Meta";
import { Route, Routes } from "react-router";

export default function Meta() {
  return (
    <>
      <Routes>
        <Route exact path="/play" element={<Play />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
