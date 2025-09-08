function counter(name) {
    let c = 0;

    return () => {
        c++;
        console.log(`${name} Count : ${c}`)
    }
}

const count1 = counter("Steve")
count1()
count1()
count1()

const count2 = counter("Jackson")
count2()
count2()
count2()
count2()