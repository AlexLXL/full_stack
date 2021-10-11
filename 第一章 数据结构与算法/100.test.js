function isPrime(n) {
    if (n <= 1) { return false }
    let N = Math.floor(Math.sqrt(n))
    for (let i = 2; i <= N; i++) {
        if (n % i === 0) {
            return false
        }
    }
    return true
}

