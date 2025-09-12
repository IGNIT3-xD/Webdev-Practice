const data = [
    {
        name: "Tv Flix",
        img: "https://ignit3-xd.github.io/Webdev-Practice/Css%20Learning/FSBF/tflix10052025.png",
        link: "https://tv.tflix.app/"
    },
    {
        name: "Durbin Live",
        img: "https://durbintvlive.com/wp-content/uploads/2025/08/durbintvlive-2.png",
        link: "https://durbintvlive.com/"
    },
    {
        name: "Footem",
        img: "https://ignit3-xd.github.io/Webdev-Practice/Css%20Learning/FSBF/Footem-2.png",
        link: "https://www.footem.site/"
    },
    {
        name: "BDix Tv",
        img: "",
        link: "https://bdixtv.serverbd247.com/"
    },
    {
        name: "Roar Zone",
        img: "",
        link: "http://tv.roarzone.info/"
    },
    {
        name: "Yalla Shot",
        img: "",
        link: "https://www.yallla-shoot.com/"
    },
    {
        name: "Koora Live",
        img: "",
        link: "https://www.koraa-live.com/"
    },
    {
        name: "Soccer Full Match",
        img: "https://ignit3-xd.github.io/Webdev-Practice/Css%20Learning/FSBF/logoDark.png",
        link: "https://soccerfullmatch.com/"
    },
    {
        name: "Full Replays",
        img: "https://ignit3-xd.github.io/Webdev-Practice/Css%20Learning/FSBF/logo-frc-small.png",
        link: "https://www.fullreplays.com/"
    },
]

const displayCards = () => {
    const content = document.getElementById('content');
    data.forEach(card => {
        content.innerHTML += `
        <div
            class="flex flex-col items-center justify-center gap-5 text-center text-white p-4 border-2 border-blue-400 rounded-lg hover:border-2 hover:border-blue-700">
            <p class="text-2xl font-medium">${card.name}</p>
            <img class="w-36"
                src="${card.img}" alt="">
            <a class="btn bg-primary text-white border-none hover:bg-secondary" href="${card.link}" target="_blank">Visit Site</a>
        </div>
        `
    })
}

displayCards()