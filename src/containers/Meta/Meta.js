import { useEffect } from "react";
import { userMetaTicket, userSelector } from "#redux/modules/user";
import { CenterContainer } from "#components/common";
import { useDispatch, useSelector } from "react-redux";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function Meta() {
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addEventListener, removeEventListener, sendMessage]);

  if (!user.meta.ticketToken) {
    return (
      <CenterContainer>
        잠시만 기다려주세요...
        <br />
        입장 권한 획득 중
      </CenterContainer>
    );
  }

  return (
    <>
      {!isLoaded && (
        <CenterContainer style={{ overflow: "hidden" }}>
          잠시만 기다려주세요...
          <br /> 플레이어 로딩 중
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
