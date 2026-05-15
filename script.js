const jokeText = document.getElementById("joke");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const voiceBtn = document.getElementById("voiceBtn");
const favBtn = document.getElementById("favBtn");
const favList = document.getElementById("favList");
const themeBtn = document.getElementById("themeBtn");

let currentJoke = "";

/* GENERATE JOKE */

async function generateJoke(){

    jokeText.innerText = "Loading Joke... 😂";

    try{

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        const data = await response.json();

        currentJoke =
            `${data.setup} 🤣 ${data.punchline}`;

        jokeText.innerText = currentJoke;
    }

    catch(error){

        jokeText.innerText =
            "Failed to fetch joke 😢";
    }
}

generateBtn.addEventListener(
    "click",
    generateJoke
);

/* COPY JOKE */

copyBtn.addEventListener(
    "click",
    () => {

        if(currentJoke === "") return;

        navigator.clipboard.writeText(currentJoke);

        alert("Joke Copied 😂");
    }
);

/* VOICE NARRATION */

voiceBtn.addEventListener(
    "click",
    () => {

        if(currentJoke === "") return;

        const speech =
            new SpeechSynthesisUtterance(currentJoke);

        speechSynthesis.speak(speech);
    }
);

/* FAVORITE JOKES */

function loadFavorites(){

    const favorites =
        JSON.parse(localStorage.getItem("favorites"))
        || [];

    favList.innerHTML = "";

    favorites.forEach(joke => {

        const li = document.createElement("li");

        li.innerText = joke;

        favList.appendChild(li);
    });
}

favBtn.addEventListener(
    "click",
    () => {

        if(currentJoke === "") return;

        let favorites =
            JSON.parse(localStorage.getItem("favorites"))
            || [];

        favorites.push(currentJoke);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        loadFavorites();

        alert("Added to Favorites ❤️");
    }
);

/* DARK / LIGHT MODE */

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("light-mode");

        if(document.body.classList.contains("light-mode")){

            themeBtn.innerText = "☀️";
        }

        else{

            themeBtn.innerText = "🌙";
        }
    }
);

/* LOAD FAVORITES ON START */

loadFavorites();