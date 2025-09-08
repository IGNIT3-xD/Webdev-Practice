const menuList = document.getElementById('menu-li')
const newsContainer = document.getElementById('news-container')
const heading = document.getElementById('heading')
const bkmarkContainer = document.getElementById('bkmark-container')
const modal = document.getElementById('my_modal_5')
const modalContainer = document.getElementById('modal-container')

const loadMenu = () => {
    fetch("https://news-api-fs.vercel.app/api/categories")
        .then(res => res.json())
        .then(data => {
            const datas = data.categories;
            datas.forEach(element => {
                // console.log(element);
                menuList.innerHTML += `
                <li id = "${element.id}" class = "menu-list cursor-pointer hover:border-b-3 border-red-800">${element.title}</li>
               `
            });
        })
        .catch(err => console.log("News not found"))

    menuList.addEventListener('click', (e) => {
        const lists = document.querySelectorAll('.menu-list');
        lists.forEach((li) => {
            li.classList.remove("border-b-3")
        })

        if (e.target.classList.contains('menu-list')) {
            e.target.classList.add("border-b-3")
        }

        loading()
        loadNews(e.target.id)
    })
}

const loadNews = (id) => {
    fetch(`https://news-api-fs.vercel.app/api/categories/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.articles);
            heading.innerHTML = `${data.categoryName}`

            if (!data.success || data.categoryName === "india") {
                heading.innerHTML = "News Not Found"
            }

            else if (data.categoryName === "menu-li") {
                heading.innerHTML = "News Not Found"
            }

            newsContainer.innerHTML = ""
            const articles = data.articles
            articles.forEach((articles) => {
                // console.log(articles);

                newsContainer.innerHTML += `
               <div class="border border-gray-100 rounded-sm overflow-hidden flex flex-col gap-3 items-center">
                    <img class="w-full" src="${articles.image.srcset[5].url}" alt="">
                    <p onclick="details('${articles.id}')" class = "cursor-pointer art-title p-3">${articles.title}</p>
                    <p>${articles.time}</p>
               </div>
               `
            })

            if (articles.length === 0) {
                newsContainer.innerHTML = "News Not Available Right Now"
            }
        })

        .catch(err => newsContainer.innerHTML = "News Not Available Right Now")
}

const loading = () => {
    newsContainer.innerHTML = `
        <div class="col-span-2 lg:col-span-3 flex items-center justify-center">
            <span class="loading loading-spinner text-error w-16"></span>
        </div>
    `
}

const details = (id) => {
    fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
        .then(res => res.json())
        .then(data => {
            const news = data.article
            modalContainer.innerHTML = `
            <img src="${news.images[0].url}" alt="">
            <p class="mt-3">
                ${news.content.join(" ")}
            </p>
            `
            modal.showModal()
        })
        .catch(err => {
            modalContainer.innerHTML = `<p class="text-center text-xl font-medium">No News Found</p>`
            modal.showModal()
        })
}

loadMenu()
loadNews('main')