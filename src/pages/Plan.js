import { NotFound } from "#containers";
import { Plan } from "#containers/Workspace";
import { Route, Routes } from "react-router";

export default function Workspace() {
  return (
    <>
      <Routes>
        <Route path="/plan" element={<Plan />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
