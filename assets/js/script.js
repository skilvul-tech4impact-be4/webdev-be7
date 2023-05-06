//URL of your MockAPI

const apiURL = 'https://643cc81ef0ec48ce9049e65f.mockapi.io/api/v1/user';

const isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn) {
    document.getElementById('login').style.display = "none";

}

// Register function
const registerForm = document.querySelector('#register-form');

function register() {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();;

        const data = {
            name: document.getElementById('UsernameX').value,
            email: document.getElementById('EmailX').value,
            password: document.getElementById('PasswordX').value
        };

        fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');

                }
                document.getElementById('register-form').reset(); // mengosongkan nilai input
                document.getElementById('register-success').classList.remove('d-none'); // menampilkan notifikasi
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                document.getElementById('register-failure').classList.remove('d-none'); // menampilkan notifikasi danger
                console.error('Error:', error);
            });
    })
};

function login() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('emailX').value;
        const password = document.getElementById('passwordX').value;
        fetch('https://643cc81ef0ec48ce9049e65f.mockapi.io/api/v1/user')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);
                if (user) {
                    localStorage.setItem('isLoggedIn', 'true'); // simpan status login user
                    window.location.href = "index.html";
                    alert(`Welcome, ${user.email}!`);
                    loginForm.reset();
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch(error => console.error(error));
    })
};


// const articles = [{
//         id: 1,
//         title: 'ahmad',
//         content: 'pakde.'
//     },
//     {
//         id: 2,
//         title: 'jokoto2',
//         content: 'Sed ut malesuada mauris, owi.'
//     }
// ];

// // Dapatkan id artikel dari parameter URL
// const urlParams = new URLSearchParams(window.location.search);
// const articleId = urlParams.get('no');


// // cari
// const article = articles.find(a => a.no == articleId);

// // Set title and content of detail article
// const titleElement = document.getElementById('detail-title');
// const contentElement = document.getElementById('detail-content');
// titleElement.textContent = article.title;
// contentElement.textContent = article.content;

//artikel mockapi

const url = 'https://643cc81ef0ec48ce9049e65f.mockapi.io/api/v1/article';
// Mendapatkan data artikel dari API endpoint
const showDataLink = document.querySelector('click');
const dataContainer = document.querySelector('artikelDetail');

// Menambahkan event listener pada link
showDataLink.addEventListener('click', async(event) => {
    // Menghilangkan default behavior dari link
    event.preventDefault();

    // Mengambil data artikel dari API
    const response = await fetch('https://643cc81ef0ec48ce9049e65f.mockapi.io/api/v1/article');
    const dataArtikel = await response.json();

    // Menambahkan data artikel pada container
    dataArtikel.forEach((artikel) => {
        const artikelHTML = `
            <div class="artikel">
                <img src="${artikel.image}"alt="${artikel.title}">
                <h2>${artikel.title}</h2>
                <p>ID: ${artikel.id}</p>
            </div>
        `;
        dataContainer.insertAdjacentHTML('beforeend', artikelHTML);
    });

    // Menampilkan data artikel pada elemen HTML
    const artikelId = document.querySelector('#artikel-id');
    const artikelTitle = document.querySelector('#artikel-title');
    const artikelContent = document.querySelector('#artikel-content');

    artikelId.innerText = dataArtikel[0].id;
    artikelTitle.innerText = dataArtikel[0].title;
    artikelContent.innerText = dataArtikel[0].content;
})

let artikel = document.getElementById("artikelDetail");

fetch("https:/https://643cc81ef0ec48ce9049e65f.mockapi.io/api/v1/article")
    .then((data) => data.json())
    .then((result) => {
        result.forEach((article) => {
            const trimmedStringTitle = article.titleartikel.length > 50 ? article.titleartikel.substring(0, 50 - 3) + "..." : article.titleartikel;
            const trimmedString = article.descartikel.length > 100 ? article.descartikel.substring(0, 100 - 3) + "..." : article.descartikel;

            artikel.innerHTML += `
      
      <div class="col-sm-9 col-md-4 col-lg-4">
        <div class="col">
            <div class="card">
                <img src="${article.image}" class="card-img-top" alt="...">
                <div class="category"> ${article.content} </div>
                <div class="card-body">
                    <h5 class="card-title">${trimmedStringTitle}</h5>
                    <p class="card-text">${trimmedString}</p>
                    <a href="artikel-details.html" class="btn btn-primary">Selengkapnya</a>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">${article.gambar}</small>
                </div>
            </div>
        </div>
      </div>
      `;
        });
    });