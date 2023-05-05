// URL of your MockAPI
const apiURL = 'https://643cc81ef0ec48ce9049e65f.mockapi.io/api/v1/user';
const isLoggedIn = localStorage.getItem('isLoggedIn');

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

const articles = [{
        id: 1,
        title: 'Policy Brief Transformasi Transportasi Jakarta',
        content: 'Emisi udara di DKI Jakarta sudah dalam kondisi yang memperihatinkan. Emisi dari kendaraan bermotor merupakan masalah utama dari pencemaran udara di DKI Jakarta.',
    },
    {
        id: 2,
        title: 'GAR (Golden Agri Resources) Mundur Dari Komitmen Nol Deforestasi',
        content: 'KKH memberi panduan dalam pelestarian hutan dan memastikan bahwa GAR tidak memiliki rekam jejak deforestasi, sambil tetap menjaga pertumbuhan'
    },
    {
        id: 3,
        title: 'Perjanjian Kelautan PBB yang Bersejarah Disetujui',
        content: 'Perjanjian tersebut diharapkan dapat berkontribusi pada konservasi dan pemanfaatan sumber daya laut secara berkelanjutan, sekaligus melindungi'
    }
];

// Dapatkan id artikel dari parameter URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// cari
const article = articles.find(a => a.id == articleId);

// Set title and content of detail article
const titleElement = document.getElementById('detail-title');
const contentElement = document.getElementById('detail-content');
titleElement.textContent = article.title;
contentElement.textContent = article.content;