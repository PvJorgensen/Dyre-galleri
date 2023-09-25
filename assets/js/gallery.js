/*delay på data hentning i ms for at simulere data hentning online*/
const myLoadTime = 2000;

// reset variables
let myData = null;
let myApp = null;

/* kicks off app when the DOM is loaded */
window.addEventListener("load", initApp);

function initApp() {
    fetchData(); // starter hentning af data fra en dummy funktion der simulerer data hentning.
    myApp = document.getElementById('app'); // vi finder det tag voress app skal leve i. kaldet app
    createLoadingScreen(); // bygger loading screen i DOM.
}

function createLoadingScreen() {
    // byg loading screen her med HTML DOM elementer og evt. et animeret gif eller billede i vores app tag.
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'modal'; // Brug CSS-klassen 'modal' til at style loading-skærmen
    loadingScreen.innerHTML = `
        <div class="modal-content">
            <div class="close">&times;</div>
            <img src="loading.gif" alt="Loading" class="loadingIcon">
        </div>
    `;

    myApp.appendChild(loadingScreen);
}

function initGallery(dataReceived) {
    // kaldes fra fetchData når data er klar.
    // set myData variablen til det modtagne data, så det er tilgængeligt for alle funktioner
    // kald funktionen resetGallery for at slette indhold i app tagget, som er indeholdt i myApp.
    // kald en funktion der kan bygge dit galleri. den hedder buildGallery
    myData = dataReceived;
    resetGallery();
    buildGallery();
}

function resetGallery() {
    // skriv kode her der kan slette alt HTML i app tagget. Husk det er indeholdt i myApp
    while (myApp.firstChild) {
        myApp.removeChild(myApp.firstChild);
    }
}

function buildGallery() {
    /* brug map funktionen på vores myData for at finde data for hvert enkelt dyr
    og sende det til en funktion der kan bygge dit galleri kort for dyret. funktionen hedder buildCard */
    myData.map(buildCard);
}

function buildCard(myAnimalData) {
    /* skriv kode der kan vise data fra myAnimalData i DOM
    husk at bruge createElement og appendChild funktionerne til at bygge semantisk korrekt HTML */
    const card = document.createElement('div');
    card.className = 'galleryCard'; // Brug CSS-klassen 'galleryCard' til at style kortet

    const image = document.createElement('img');
    image.src = myAnimalData.picture;
    image.alt = myAnimalData.name;

    const title = document.createElement('h2');
    title.textContent = myAnimalData.name;

    const description = document.createElement('p');
    description.textContent = myAnimalData.shortDescription;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);

    myApp.appendChild(card);
}

/* get data function DO NOT TOUCH!!!!! ...................................................... */
async function fetchData() {
    // data object
    console.log('fetching data');
    await new Promise(resolve => setTimeout(resolve, myLoadTime));

    const myData = [
        {
            name: 'Elefant',
            picture: 'assets/img/elephant.jpg',
            description: 'Loxodonta africana, også kendt som afrikansk elefant...',
            shortDescription: 'Loxodonta africana, også kendt som afrikansk elefant.'
        },
        {
            name: 'Tiger',
            picture: 'assets/img/standard_tiger.jpg',
            description: 'Panthera tigris, også kendt som tigeren...',
            shortDescription: 'Panthera tigris, også kendt som tigeren.'
        },
        {
            name: 'Tarantel',
            picture: 'assets/img/Brachypelma_smithi.jpg',
            description: 'Brachypelma smithi, også kendt som den mexicansk rødknæs tarantel...',
            shortDescription: 'Brachypelma smithi, også kendt som den mexicansk rødknæs tarantel.'
        },
        {
            name: 'Koala',
            picture: 'assets/img/_WW236934.jpg',
            description: 'Phascolarctos cinereus, også kendt som koala...',
            shortDescription: 'Phascolarctos cinereus, også kendt som koala.'
        },
        {
            name: 'Haj',
            picture: 'assets/img/great-white.jpg',
            description: 'Carcharodon carcharias, også kendt som en hvidhaj...',
            shortDescription: 'Carcharodon carcharias, også kendt som en hvidhaj.'
        }
    ];
    initGallery(myData);
}
