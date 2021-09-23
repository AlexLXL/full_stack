function bsearch(A, x) {
    let l = 0,
        r = A.length - 1,
        g
    // 循环不变式
    // l: 左边界
    // r: 右边界
    // g: l,r的中间位置

    while (l <= r) {
        g = Math.floor( (l+r)/2 );
        if (A[g] === x) return g
        else if (A[g] > x) r = g - 1;
        else l = g + 1;
    }

    return -1
}

const A = [11, 22, 32, 54, 67, 81, 99];
console.log(bsearch(A, 100))
console.log(bsearch(A, 33))
console.log(bsearch(A, 67))