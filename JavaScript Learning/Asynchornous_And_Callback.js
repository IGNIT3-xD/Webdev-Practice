// Asynchornous
// const example_1 = () => {
//     console.log('Example 1')
// }

// const example_2 = () => {
//     setTimeout(function () {        // This function will execute after 2 sec. But all the below functions will execute.
//         console.log('Example 2')
//     }, 2000)

// }

// const example_3 = () => {
//     console.log('Example 3')
// }

// const example_4 = () => {
//     console.log('Example 4')
// }

// example_1()
// example_2()
// example_3()
// example_4()

// Call back
const task_1 = (callback) => {
    console.log("Task 1");
    callback();
}

const task_2 = (callback) => {

    setTimeout(function () {        // This function execute after 2 sec. But All the below fucntions will wait untill this function will call.
        console.log("Task 2");
        callback();
    }, 2000)
}

const task_3 = (callback) => {
    console.log("Task 3");
    callback()
}

const task_4 = () => {
    console.log("Task 4")
}

// task_1(function t1() {
//     task_2(function t2() {
//         task_3(function t3() {
//             task_4();
//         })
//     })
// })

// Or
task_1(() => {
    task_2(() => {
        task_3(() => {
            task_4();
        })
    })
})