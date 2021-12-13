function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    return !!window.RTCPeerConnection;
}

var yourVideo = document.querySelector('#yours'),
    theirVideo = document.querySelector('#theirs'),
    yourConnection,
    theirConnection;

if (hasUserMedia()) {
    navigator.getUserMedia({video: true, audio: false}, function (stream) {
        try {
            yourVideo.srcObject = stream
        } catch (e) {
            yourVideo.src = URL.createObjectURL(stream) // 旧的用法(新浏览器不支持)
        }
        if (hasRTCPeerConnection()) {
            startPeerConnection(stream);
        } else {
            alert("抱歉, 您的浏览器不支持WebRTC1.");
        }
    }, function (error) {
        console.log("抱歉, 开启摄像头失败, 请重试");
    });
} else {
    alert("抱歉, 您的浏览器不支持WebRTC2.");
}

function startPeerConnection(stream) {
    var configuration = {
        "iceServers": [{"url": "stun:127.0.0.1:3000"}]
    };
    yourConnection = new RTCPeerConnection(configuration);
    theirConnection = new RTCPeerConnection(configuration);

    // 监听流的创建
    yourConnection.addStream(stream);
    theirConnection.onaddstream = function (e) {
        try {
            theirVideo.srcObject = e.stream
        } catch (e) {
            console.log(e)
            theirVideo.src = window.URL.createObjectURL(e.stream);
        }
    };

    // 创建ICE处理 (互相添加候选人列表)
    yourConnection.onicecandidate = function (event) {
        if (event.candidate) {
            theirConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    theirConnection.onicecandidate = function (event) {
        if (event.candidate) {
            yourConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    };

    // 开始offer (双方呼叫和应答构建对等连接)
    yourConnection.createOffer(function (offer) {
        yourConnection.setLocalDescription(offer);
        theirConnection.setRemoteDescription(offer);
        theirConnection.createAnswer(function (offer) {
            theirConnection.setLocalDescription(offer);
            yourConnection.setRemoteDescription(offer);
        });
    });
};
