import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AuthContainer, KaKaoButton, KakaoButton } from "#components/auth";
import { Button, Typo } from "#components/common";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <Typo as="h2" style={{ marginBottom: "1.5rem", fontWeight: "600" }}>
        로그인
      </Typo>
      <KakaoButton
        onClick={() => {
          window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
            process.env.REACT_APP_KAKAO_REST_KEY
          }&redirect_uri=${
            process.env.NODE_ENV === "development"
              ? process.env.REACT_APP_KAKAO_REDIRECT_DEBUG
              : process.env.REACT_APP_KAKAO_REDIRECT_PRODUCTION
          }&response_type=code`;
        }}
      >
        카카오로 로그인
      </KakaoButton>
    </AuthContainer>
  );
}
