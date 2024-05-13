import { NotFound } from "#containers";
import { Meta as MetaContainer } from "#containers/Meta";
import { Route, Routes } from "react-router";

export default function Meta() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MetaContainer />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
