import { useNavigate } from "react-router-dom";

import { Button, CenterContainer, Container, Typo } from "#components/common";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <CenterContainer>
      <Container>
        <Typo as="h2" style={{ textAlign: "center" }}>
          404 Not Found
          <br />
          페이지를 찾지 못했습니다
        </Typo>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            theme="primary white"
            weight="bold"
          >
            돌아가기
          </Button>
        </div>
      </Container>
    </CenterContainer>
  );
}
