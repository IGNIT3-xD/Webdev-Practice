const levelContainer = document.getElementById('level-container');
const wordsContainer = document.getElementById('words-container');
const mainModal = document.getElementById('main-modal');
const detContainer = document.getElementById('det-container');
const load = document.getElementById('loading');
const searchBtn = document.getElementById('search-btn');
const searchWord = document.getElementById('search-word');

// Level
const loadLevel = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/levels/all`)
        const data = await res.json()
        displayLevels(data)
    }

    catch (err) {
        levelContainer.innerHTML = `<p class="text-black font-bold text-2xl lg:text-3xl text-center">Please check your internet connection !!!</p>`
    }
}

const displayLevels = (data) => {
    const datas = data.data
    datas.forEach(level => {
        levelContainer.innerHTML += `
        <button id="${level.level_no}" class="lvl-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open-reader"></i>Lesson - ${level.level_no}</button>
        `
    });

    // Active btn
    levelContainer.addEventListener('click', (e) => {
        // reset all btn
        const btns = document.querySelectorAll(".lvl-btn")
        btns.forEach((btn) => {
            btn.classList.remove("text-white", "bg-blue-800")
        })

        // active btn
        if (e.target.classList.contains("lvl-btn")) {
            e.target.classList.add("text-white", "bg-blue-800")

            loadWords(e.target.id)
        }
    })
}

// Words by level
const loadWords = async (id) => {
    try {
        loading(true)

        // console.log(id);
        const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        const data = await res.json()
        const datas = data.data;

        wordsContainer.innerHTML = ""

        datas.forEach((words) => {
            wordsContainer.innerHTML += `
                <div class="bg-white text-center p-5 space-y-3 rounded-xl shadow-sm">
                    <p class="text-xl font-bold lg:text-2xl">${words.word}</p>
                    <p>Meaning /Pronounciation</p>
                    <p class="hind-siliguri font-medium text-xl lg:text-2xl">"${words.meaning ? words.meaning : "....."} / ${words.pronunciation}"</p>
                    <div class="flex items-center justify-between">
                        <p class="text-2xl bg-[#1A91FF10] p-1.5 rounded-lg"><i id="${words.id}" class="info cursor-pointer fa-solid fa-circle-info"></i></p>
                        <p onclick="pronounceWord('${words.word}')" class="text-2xl bg-[#1A91FF10] p-1.5 rounded-lg"><i class="cursor-pointer fa-solid fa-volume-high"></i></p>
                    </div>
                </div>
            `
        })

        // Check if any lesson are empty
        if (datas.length === 0) {
            wordsContainer.innerHTML = `
                <div class="hind-siliguri text-center p-8 lg:col-span-3">
                    <img class="mx-auto" src="./resources/assets/alert-error.png" alt="">
                    <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <p class="text-2xl lg:text-3xl mt-3 font-medium">নেক্সট Lesson এ যান</p>
                </div>
           `
        }
    }

    catch (error) {
        console.log("Error happened");
    }

    loading(false)
}

wordsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains('info')) {
        details(e.target.id)
    }
})

// Word by details
const details = async (id) => {
    try {
        // console.log(id);
        const res = await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        const data = await res.json()
        const datas = data.data;
        // console.log(datas);
        detContainer.innerHTML = `
        <p class="font-bold text-xl">${datas.word} <span>(<i class="fa-solid fa-microphone-lines"></i>:${datas.pronunciation})</span></p>
        <div class="font-medium space-y-2">
            <p>Meaning</p>
            <p>${datas.meaning ? datas.meaning : "....."}</p>
        </div>
        <div class="space-y-2">
            <p class="font-bold">Exmaple</p>
            <p>${datas.sentence}</p>
        </div>
        <div class="space-y-2">
            <p class="font-bold">সমার্থক শব্দ গুলো</p>
            <div class="flex items-center gap-3">
                <p class="bg-blue-50 px-3 py-2 rounded-md">${datas.synonyms.length !== 0 ? datas.synonyms[0] : "....."}</p>
                <p class="bg-blue-50 px-3 py-2 rounded-md">${datas.synonyms.length !== 0 ? datas.synonyms[1] : "....."}</p>
                <p class="bg-blue-50 px-3 py-2 rounded-md">${datas.synonyms.length !== 0 ? datas.synonyms[2] : "....."}</p>
            </div>
        </div>
    `
        mainModal.showModal();
    }

    catch (err) {
        detContainer.innerHTML = "Please check your internet connection"
    }

}

// Loading
const loading = (status) => {
    if (status === true) {
        load.classList.remove("hidden")
        wordsContainer.classList.add("hidden")
    }
    else {
        wordsContainer.classList.remove("hidden")
        load.classList.add("hidden")
    }
}

// Search
searchBtn.addEventListener("click", () => {

    // active button will remove after click in search btn
    const btns = document.querySelectorAll(".lvl-btn")
    btns.forEach((btn) => {
        btn.classList.remove("text-white", "bg-blue-800")
    })

    const value = searchWord.value.trim().split(/\s+/).join('').toLowerCase();
    // console.log(value);
    if (value === "") {
        return;
    }

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data
            const filterWords = allWords.filter((word) => {
                return word.word.toLowerCase().includes(value)
            });

            // display the words container for founded words
            wordsContainer.innerHTML = ""

            filterWords.forEach((newData) => {
                // console.log(newData);
                wordsContainer.innerHTML += `
                <div class="bg-white text-center p-5 space-y-3 rounded-xl shadow-sm">
                    <p class="text-xl font-bold lg:text-2xl">${newData.word}</p>
                    <p>Meaning /Pronounciation</p>
                    <p class="hind-siliguri font-medium text-xl lg:text-2xl">"${newData.meaning ? newData.meaning : "....."} / ${newData.pronunciation}"</p>
                    <div class="flex items-center justify-between">
                        <p class="text-2xl bg-[#1A91FF10] p-1.5 rounded-lg"><i id="${newData.id}" class="info cursor-pointer fa-solid fa-circle-info"></i></p>
                        <p onclick="pronounceWord('${newData.word}')" class="text-2xl bg-[#1A91FF10] p-1.5 rounded-lg"><i class="cursor-pointer fa-solid fa-volume-high"></i></p>
                    </div>
                </div>
            `
            })
        })
})

// Sound
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

loadLevel()