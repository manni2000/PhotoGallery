const imageGrid = document.getElementsByClassName('image-grid')[0]
const button = document.getElementById('load-more');
const form = document.getElementById("form");
const search = document.getElementById("search");


const key = "zPneqE9Acuj81SBzY32s6gxKcDlLJS1wIu2bScELw8PZdIpASvSyk0Jj"
let url = `https://api.pexels.com/v1/curated`;
let index = 1;

const getMoreImages = (page_no) => {
    fetch(url + `?page=${page_no}&per_page=15`, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Authorization": key,
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(function (data) {
            console.log(data)

            data.photos.forEach(element => {
                const div = document.createElement('div')
                div.classList.add('image-block')
                div.innerHTML = `<img src=${element.src.landscape}>`
                imageGrid.appendChild(div)
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

button.addEventListener('click', (e) => {
    index += 1;
    getMoreImages(index);
})

form.addEventListener('submit', e => {
    if(search.value === '') return;
    index = 1
    imageGrid.innerHTML = '';
    url = `https://api.pexels.com/v1/search?query=${search.value}`;
    getMoreImages(index, `search?query=${search.value}`)
})

getMoreImages(1);