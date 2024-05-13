import { NotFound } from "#containers";
import { Login, Register, CallbackKakao } from "#containers/Auth";
import { Route, Routes } from "react-router";

export default function Auth() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/callback/oauth/kakao" element={<CallbackKakao />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
