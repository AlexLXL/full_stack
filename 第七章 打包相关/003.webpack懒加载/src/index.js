let btn = document.getElementById("play")
btn.addEventListener('click', function () {
    import('./video.js').then(function (res) {
        console.log(res.default)
    })
})