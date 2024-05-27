import { Button } from "#components/common";
import { authSessionBye } from "#redux/modules/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  position: absolute;
  top: 4rem;
  right: 0;

  width: 7rem;
  height: 0;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  overflow: hidden;

  transition: height 0.4s ease-out;

  &.open {
    height: 9.5rem;
  }
`;

const MenuContent = styled.div`
  width: 100%;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  flex-direction: column;

  background: white;
  color: black;

  border: solid 0.1rem var(--gray3);
`;

const MenuItem = styled(Button)`
  & + & {
    margin-top: 0.5rem;
  }

  width: 100%;
  height: 1.5rem;
  line-height: 1.5;

  border: none;
  padding: 0;
  text-align: left;
`;

export default function HeaderUserMenu({ userMenuOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <MenuContainer className={userMenuOpen ? "open" : ""}>
      <MenuContent className={userMenuOpen ? "open" : ""}>
        <MenuItem
          onClick={() => {
            navigate("/user/profile");
          }}
        >
          내 프로필
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/meta/play");
          }}
        >
          메타버스
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/user/setting");
          }}
        >
          설정
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (window.confirm("정말로 로그아웃하시겠습니까?")) {
              dispatch(authSessionBye({}));
            }
          }}
        >
          로그아웃
        </MenuItem>
      </MenuContent>
    </MenuContainer>
  );
}
