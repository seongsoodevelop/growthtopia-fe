import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CenterContainer } from "#components/common";
import { authSocialKakao } from "#redux/modules/auth";

export default function CallbackKakao() {
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    dispatch(
      authSocialKakao({
        code,
        redirect:
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_KAKAO_REDIRECT_DEBUG
            : process.env.REACT_APP_KAKAO_REDIRECT_PRODUCTION,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CenterContainer>카카오 서버와 통신 중입니다</CenterContainer>;
}
