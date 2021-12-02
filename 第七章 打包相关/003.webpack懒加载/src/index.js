let btn = document.getElementById("play")
btn.addEventListener('click', function () {
    // 模块里的import react from 'react'是一个关键字,
    // 这里的import是一个方法
    import('./video.js').then(function (res) {
        console.log(res.default)
    })
})