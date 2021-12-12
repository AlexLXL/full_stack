function hasUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var video = document.querySelector('video'),
        canvas = document.querySelector('canvas'),
        streaming = false;

    navigator.getUserMedia({
        video: true,
        audio: false
    }, function (stream) {
        try {
            video.srcObject = stream
        } catch (e) {
            video.src = URL.createObjectURL(stream)
        }
        streaming = true;
    }, function (error) {
        console.log("摄像头启动错误:", error);
    });

    var filters = ['', 'grayscale', 'sepia', 'invert'],
        currentFilter = 0;
    document.querySelector('#captureBtn').addEventListener('click', function (event) {
        if (streaming) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;

            console.dir(video)
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);

            currentFilter++;
            if (currentFilter > filters.length - 1) currentFilter = 0;
            canvas.className = filters[currentFilter];

            context.fillStyle = "white";
            context.fillText("Hello World!", 10, 10);
        }
    });
} else {
    alert("对不起, 您的浏览器不支持getUserMedia.");
}
