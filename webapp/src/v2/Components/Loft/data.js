import Config from '../../../Utils/Config';

let baseURL = Config.gRPCURL;

export const joinMeeting = (sessionId, meetingId) => {
  const url = `${baseURL}/grpc/videocall.VideoCallService/JoinMeeting`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      sessionId: sessionId,
    },
    body: JSON.stringify({
      meetingId,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      const options = {};
      options.wnd = window.open('/jitsi', "_blank");
      options.wnd['jitsiVideoCall'] = { options: myJson, message: myJson };
    });
}