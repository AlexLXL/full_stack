function hasUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
}

if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

    let videoSourceId = null
    let promise = navigator.mediaDevices.enumerateDevices()
    promise.then((mediaDeviceInfos) => {
        // console.log(mediaDeviceInfos)
        for (let i = 0; i < mediaDeviceInfos.length; i++) {
            let source = mediaDeviceInfos[i]
            if (source.kind === "videoinput") {
                let r = confirm(`使用设备: ${source.deviceId}`)
                if (r) {
                    videoSourceId = source.deviceId
                    return
                }
            }
        }
    })

    promise.then((mediaDeviceInfos) => {
        let constraints = {
            video: {
                width: 640, // 宽高
                height: 480,
                deviceId: videoSourceId
                // mandatory: { // 最小最大宽高
                //     minWidth: 480,
                //     minHeight: 320,
                //     maxWidth: 1024,
                //     maxHeight: 768
                // }
                // 还可以设置长宽比等
            },
            audio: false
        }
        /*
        // 兼容移动端
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            constraints = {
                video: {
                    mandatory: {
                        minWidth: 480,
                        minHeight: 320,
                        maxWidth: 1024,
                        maxHeight: 768
                    }
                },
                audio: true
            };
        }*/
        navigator.getUserMedia(constraints, (stream) => {
            let video = document.querySelector('video')
            try {
                video.srcObject = stream
            } catch (e) {
                video.src = URL.createObjectURL(stream) // 旧的用法(新浏览器不支持)
            }
        }, function (err) {
            console.log("启动媒体流失败:", err)
        });
    })
} else {
    alert(`抱歉, 你的浏览器不支持 getUserMedia.`)
}
