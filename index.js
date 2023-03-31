const imageGrid = document.getElementsByClassName('image-grid')[0]
const button = document.getElementById('load-more');
const form = document.getElementById("form");
const search = document.getElementById("search");


const key = "zPneqE9Acuj81SBzY32s6gxKcDlLJS1wIu2bScELw8PZdIpASvSyk0Jj"
const base_url = `https://api.pexels.com/v1/curated?page=1&per_page=15`;
let url = base_url;

const getMoreImages = () => {
    console.log(url)
    fetch(url, {
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
            url = data.next_page
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

button.addEventListener('click', getMoreImages)

form.addEventListener('submit', e => {
    e.preventDefault()
    imageGrid.innerHTML = '';
    if(search.value === '') url = base_url;
    else url = `https://api.pexels.com/v1/search?query=${search.value}`;
    getMoreImages()
})

getMoreImages(1);