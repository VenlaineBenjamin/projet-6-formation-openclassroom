const gallery = document.querySelector(".gallery");
const mesBtnFilter = document.querySelectorAll(".button-filtre");
const btnFiltreTout = document.querySelector(".button-filtre-tout");
const btnFiltreObjet = document.querySelector(".button-filtre-object");
const btnFiltreAppartement = document.querySelector(
    ".button-filtre-appartement"
);
const btnFiltreHR = document.querySelector(".button-filtre-hotel");

const linkLogin = document.querySelector(".btnLogin");
console.log(linkLogin);

const btnModif = document.querySelector(".loginShowBtn");
console.log(btnModif);

const bannerEdit = document.querySelector(".banner-edite");

// récupération du token
const token = localStorage.getItem("token");
console.log(token);
token
    ? console.log("état de connection : connecté")
    : console.log("état de connection : non connecté");
const notConected = document.querySelector(".connection");
console.log(notConected);
const alredyConnect = document.querySelector(".deconnection");
console.log(alredyConnect);

if (token) {
    notConected.style.display = "none";
    alredyConnect.style.display = "block";
    btnModif.style.display = "block";
    bannerEdit.style.display = "flex";
    mesBtnFilter.forEach((btn) => {
        btn.style.display = "none";
    });
} else {
    notConected.style.display = "block";
    alredyConnect.style.display = "none";
    bannerEdit.style.display = "none";
    btnModif.style.display = "none";
    mesBtnFilter.forEach((btn) => {
        btn.style.display = "nblock";
    });
}

alredyConnect.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.href = "../";
    btnModif.style.display = "none";
    notConected.style.display = "block";
    alredyConnect.style.display = "none";
});

let works = [];
let categories = [];

// ajoute de la classe active au bouton cliqué et enlève la classe active des autres boutons
mesBtnFilter.forEach((btn) => {
    btn.addEventListener("click", () => {
        mesBtnFilter.forEach((btn) => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    });
});

function filterButton() {
    // Pour chaque créer un addeventListener qui va filtrer works pour créer un nouveaux tableau et l'envoyer a displayWorks

    btnFiltreTout.addEventListener("click", () => {
        displayWorks(works);
    });

    btnFiltreObjet.addEventListener("click", () => {
        const worksToDisplay = works.filter((work) => {
            return work.categoryId === 1;
        });
        displayWorks(worksToDisplay);
    });

    btnFiltreAppartement.addEventListener("click", () => {
        const worksToDisplay = works.filter((work) => {
            return work.categoryId === 2;
        });
        displayWorks(worksToDisplay);
    });

    btnFiltreHR.addEventListener("click", () => {
        const worksToDisplay = works.filter((work) => {
            return work.categoryId === 3;
        });
        displayWorks(worksToDisplay);
    });
}
filterButton();

function displayWorks(worksToDisplay) {
    gallery.innerHTML = "";
    worksToDisplay.forEach((work) => {
        const createFigure = document.createElement("figure");
        createFigure.classList.add("gallery-image");
        createFigure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
    `;
        gallery.appendChild(createFigure);
    });
}

export function fetchWorks() {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            works = data;
            displayWorks(works);
        });
}
fetchWorks();

function fetchCategory() {
    fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
        .then((data) => {
            categories = data;
            filterButton();
        });
}
fetchCategory();
