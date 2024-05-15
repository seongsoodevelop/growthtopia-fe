import styled from "styled-components";
import { Button } from "#components/common";
import HeaderUserMenu from "./HeaderUserMenu";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "#redux/modules/auth";
import { controlSelector, updateControlBase } from "#redux/modules/control";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--primary);
  color: white;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 4rem;
  padding: 1rem;

  display: flex;
  align-items: center;

  font-weight: 800;

  user-select: none;
`;

const HeaderMargin = styled.div`
  margin-bottom: 4rem;
`;

const Logo = styled.div`
  font-size: 1.25rem;
`;

const Control = styled.div`
  position: relative;
  height: 100%;
`;

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);
  const control = useSelector(controlSelector);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo>GrowthTopia</Logo>
          <div style={{ flexGrow: 1 }} />
          <Control>
            {auth.isGreeted && (
              <>
                {auth.isLogged ? (
                  <>
                    <Button
                      theme="none"
                      onClick={() => {
                        dispatch(
                          updateControlBase({
                            userMenuOpen: !control.base.userMenuOpen,
                          })
                        );
                      }}
                    >
                      {auth.loggedData.nickname}
                    </Button>
                    <HeaderUserMenu userMenuOpen={control.base.userMenuOpen} />
                  </>
                ) : (
                  <Button
                    theme="none"
                    onClick={() => {
                      navigate("/auth/login");
                    }}
                  >
                    로그인
                  </Button>
                )}
              </>
            )}
          </Control>
        </HeaderContent>
      </HeaderContainer>
      <HeaderMargin />
    </>
  );
}
