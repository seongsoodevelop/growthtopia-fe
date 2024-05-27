import { useEffect } from "react";
import { userMetaTicket, userSelector } from "#redux/modules/user";
import { CenterContainer } from "#components/common";
import { useDispatch, useSelector } from "react-redux";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Play() {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const unityContext = useUnityContext({
    loaderUrl: "/unity/Build/build.loader.js",
    dataUrl: "/unity/Build/build.data",
    frameworkUrl: "/unity/Build/build.framework.js",
    codeUrl: "/unity/Build/build.wasm",
  });
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
  } = unityContext;

  const handleGetTicketTokenFromReact = () => {
    sendMessage("@ReactCommunicator", "GetTicketToken", user.meta.ticketToken);
  };

  useEffect(() => {
    dispatch(userMetaTicket({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    addEventListener("GetTicketTokenFromReact", handleGetTicketTokenFromReact);
    return () => {
      removeEventListener(
        "GetTicketTokenFromReact",
        handleGetTicketTokenFromReact
      );
      sendMessage("@ReactCommunicator", "OnQuit");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addEventListener, removeEventListener, sendMessage]);

  if (!user.meta.ticketToken) {
    return <CenterContainer>입장 권한을 획득하는 중입니다</CenterContainer>;
  }

  return (
    <>
      {!isLoaded && (
        <CenterContainer style={{ overflow: "hidden" }}>
          플레이어를 불러오는 중입니다
        </CenterContainer>
      )}
      <Unity
        unityProvider={unityProvider}
        style={
          isLoaded
            ? {
                width: "100vw",
                height: "100vh",
              }
            : {
                width: "0px",
                height: "0px",
                display: "none",
              }
        }
      />
    </>
  );
}
