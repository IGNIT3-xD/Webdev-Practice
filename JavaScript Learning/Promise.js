const prom = new Promise((resolve, reject) => {
    let n = 11;
    if (n < 10) {
        reject("N is too small")
        return;
    }

    setTimeout(() => {
        console.log("I am promise");
        resolve("Successfully ececuted")
    }, 400)
})
prom.then(res => console.log(res))
    .catch(err => console.log(err))