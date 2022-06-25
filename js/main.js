// fetching movies from api .

let moviesResult = [];
async function movies(type) {
    let datalink = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=dc2264e7d593865e5e13a552c91dbfa1`);
    let data = await datalink.json();

    moviesResult = data.results;
    display(moviesResult);
};

movies("now_playing");



// display function .------------------------------------------------

function display(array) {
    let movieItem = "";
    for (let i = 0; i < array.length; i++) {
        movieItem += `  <div class="col-xl-3 col-lg-4 col-md-6 p-3 ">
        <div class="movieItem">
            <img src="https://image.tmdb.org/t/p/w500${array[i].poster_path}" alt="movie" class="w-100">
            <div class="movieDetails ">
                <div class="data">
                    <h2>${(array[i].title == undefined ? array[i].name : array[i].title)}</h2>
                    <p>${array[i].overview}</p>
                    <h6>Rate:${array[i].vote_average}</h6>
                    <h6>${array[i].release_date == undefined ? array[i].first_air_date : array[i].release_date}</h6>
                </div>
            </div>
        </div>
    </div>
     
     `

    };

    document.getElementById("mainrow").innerHTML = movieItem;

};


// navbtn---------------------------------------------------------------
$('#navbtn').click(function() {


    if ($('.sidebar').css('left') == "0px") {
        console.log("-250");
        $('.sidebar').animate({ left: "-250px" }, 500);
        $("#navbtn").removeClass("fa-xmark").addClass("fa-lines-leaning")
    } else {
        console.log("0");
        $("#navbtn").removeClass("fa-lines-leaning").addClass("fa-xmark");
        $('.sidebar').animate({ left: "0" }, 500)

    }



});




// menu links----------------------------------------------------------
$("#playing").click(function() {
    movies("now_playing");
})
$("#popular").click(function() {
    movies("popular");
})
$("#top_rated").click(function() {
    movies("top_rated");
})
$("#upcoming").click(function() {
    movies("upcoming");
})
$("#trending").click(function() {
    (async function trending() {
        let trendlink = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=dc2264e7d593865e5e13a552c91dbfa1`);
        let datatrend = await trendlink.json();

        moviesResult = datatrend.results;
        display();
    })();
});


// Search___________________________________________________________

document.querySelector(".search").addEventListener("keyup", function() {
    let typed = document.querySelector(".search").value;
    let founded = "";

    console.log(moviesResult);
    console.log(moviesResult[0].title.toLowerCase().includes(typed.toLowerCase()));
    for (let i = 0; i < moviesResult.length; i++) {
        if (moviesResult[i].title == undefined) {
            if (moviesResult[i].name.toLowerCase().includes(typed.toLowerCase()) == true) {
                founded += `  <div class="col-xl-3 col-lg-4 col-md-6 p-3 ">
        <div class="movieItem">
            <img src="https://image.tmdb.org/t/p/w500${moviesResult[i].poster_path}" alt="movie" class="w-100">
            <div class="movieDetails ">
                <div class="data">
                    <h2>${(moviesResult[i].title == undefined ? moviesResult[i].name : moviesResult[i].title)}</h2>
                    <p>${moviesResult[i].overview}</p>
                    <h6>Rate:${moviesResult[i].vote_average}</h6>
                    <h6>${moviesResult[i].release_date == undefined ? moviesResult[i].first_air_date : moviesResult[i].release_date}</h6>
                </div>
            </div>
        </div>
    </div>

     `
            }


        } else {
            if (moviesResult[i].title.toLowerCase().includes(typed.toLowerCase()) == true) {
                founded += `  <div class="col-xl-3 col-lg-4 col-md-6 p-3 ">
        <div class="movieItem">
            <img src="https://image.tmdb.org/t/p/w500${moviesResult[i].poster_path}" alt="movie" class="w-100">
            <div class="movieDetails ">
                <div class="data">
                    <h2>${(moviesResult[i].title == undefined ? moviesResult[i].name : moviesResult[i].title)}</h2>
                    <p>${moviesResult[i].overview}</p>
                    <h6>Rate:${moviesResult[i].vote_average}</h6>
                    <h6>${moviesResult[i].release_date == undefined ? moviesResult[i].first_air_date : moviesResult[i].release_date}</h6>
                </div>
            </div>
        </div>
    </div>

     `
            }
        };

    }



    document.getElementById("mainrow").innerHTML = founded;
});
// -------------------------search by word in api------------------------------------------
let allmovies = [];
async function all(word) {
    let searchlink = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=dc2264e7d593865e5e13a552c91dbfa1&language=en-US&query=${word}&page=1&include_adult=false`);
    let searchdata = await searchlink.json();

    allmovies = searchdata.results;
    display(allmovies);
};

console.log(allmovies);

document.querySelector(".wordsearch").addEventListener("keyup", function() {
    let word = document.querySelector(".wordsearch").value;

    all(word);
});

// __________________________ elhamdulilah____________________  //