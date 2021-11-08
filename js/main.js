// auto call function
selectList("movie/now_playing");
let currentCategeory = "movie/now_playing";

// ***************************** start of Events *****************************

// xmlrequest events
$("#nowPlaying").click(function(){
    selectList("movie/now_playing");
    currentCategeory = "movie/now_playing";
})

$("#popular").click(function(){
    selectList("movie/popular")
    currentCategeory = "movie/popular";
})

$("#topRated").click(function(){
    selectList("movie/top_rated")
    currentCategeory = "movie/top_rated";
})

$("#trending").click(function(){
    selectList("trending/all/day")
    currentCategeory = "trending/all/day";
})

$("#upcoming").click(function(){
    selectList("movie/upcoming")
    currentCategeory = "movie/upcoming";
})

$("#home").click(function(){
    selectList("movie/now_playing");
    currentCategeory = "movie/now_playing";
})


// validation events

$("#uName").blur(nameValidation)

$("#uEmail").blur(emailValidation)

$("#uPhone").blur(phoneValidation)

$("#uAge").blur(ageValidation)

$("#uPass").blur(passValidation)

$("#uPassConfirm").blur(passConfirmValid)

$("#submitClick").click(function(){
    validation();
    console.log("demo")
});

// search events

$("#search").keypress(function(){
    searchMovies(this.value,currentCategeory);
})

$("#searchByWord").keypress(function(){
    searchMoviesByWord(this.value);
})


// ***************************** end of Events *****************************

// ***************************** start of effects *****************************

let navBtn = false;
$("#toggleBtn").click(function(){
    if(!navBtn){
        $(".nav-toggle").animate({left:"250px"},500);
        $(".nav-menu").animate({left:"0"},500);
        $("#toggleBtn").html("X");
        $("#nowPlaying").animate({top:"0"},800)
        $("#popular").animate({top:"0"},1000)
        $("#topRated").animate({top:"0"},1200)
        $("#trending").animate({top:"0"},1400)
        $("#upcoming").animate({top:"0"},1600)
        $("#contactUs").animate({top:"0"},1800)
        navBtn = true;
    }
    else{
        $(".nav-toggle").animate({left:"0"},500);
        $(".nav-menu").animate({left:"-250px"},500);
        $("#toggleBtn").html(`<div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>`);
        $(".nav-menu-items a").animate({top:"500px"},1000)
        navBtn = false;
    }
})



// ***************************** end of effects *****************************


// ***************************** start of functions *****************************


//request function

async function selectList(categeory) {
    let respones = await fetch(`https://api.themoviedb.org/3/${categeory}?api_key=428738f72b78f80e7d92b4fcfe26ee94`);
    let movies = await respones.json();
    displayMovies(movies.results);
    return movies.results;
}  

function displayMovies(list) {
    let box = ``;
    for(let i = 0; i < list.length; i++) {
        box += `<div class="col-md-6 col-lg-4 my-3 px-3">
                    <div class="movie">
                        <img src="https://image.tmdb.org/t/p/w500/${list[i].poster_path}"
                        class="img-fluid rounded-3" alt="">
                        <div class="movie-overlay rounded-3 d-flex flex-column justify-content-center text-center">
                            <p class="movie-title">${list[i].title}</p>
                            <p class="movie-content">${list[i].overview}</p>
                            <p class="movie-content">rate:${list[i].vote_average}</p>
                            <p class="movie-content">${list[i].release_date}</p>
                         </div>
                    </div>
                </div>`
    }
    document.getElementById("moviesRow").innerHTML = box;
}

//validation functions

function nameValidation() {
    let uInput = uName.value;
    let regix = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;

    if (regix.test(uInput)) {
        uName.classList.add("is-valid")
        uName.classList.remove("is-invalid")
        error1.classList.replace("d-flex", "d-none")
        return true;
    }
    else {
        uName.classList.add("is-invalid")
        error1.classList.replace("d-none", "d-flex")
        return false;
    }
}

function emailValidation() {
    let uInput = uEmail.value;
    let regix = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (regix.test(uInput)) {
        uEmail.classList.add("is-valid")
        uEmail.classList.remove("is-invalid")
        error2.classList.replace("d-flex", "d-none")
        return true;
    }
    else {
        uEmail.classList.add("is-invalid")
        error2.classList.replace("d-none", "d-flex")
        return false;
    }

}

function phoneValidation() {
    let uInput = uPhone.value;
    let regix = /^[0-9]{11}$/;

    if (regix.test(uInput)) {
        uPhone.classList.add("is-valid")
        uPhone.classList.remove("is-invalid")
        error3.classList.replace("d-flex", "d-none")
        return true;
    }
    else {
        uPhone.classList.add("is-invalid")
        error3.classList.replace("d-none", "d-flex")
        return false;
    }
}

function ageValidation() {

    if (uAge.value > 0 && uAge.value <= 200) {
        uAge.classList.add("is-valid")
        uAge.classList.remove("is-invalid")
        error4.classList.replace("d-flex", "d-none")
        return true;
    }
    else {
        uAge.classList.add("is-invalid")
        error4.classList.replace("d-none", "d-flex")
        return false;
    }
}

function passValidation() {
    let uInput = uPass.value;
    let regix = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (regix.test(uInput)) {
        uPass.classList.add("is-valid")
        uPass.classList.remove("is-invalid")
        error5.classList.replace("d-flex", "d-none")
        return true;
    }
    else {
        uPass.classList.add("is-invalid")
        error5.classList.replace("d-none", "d-flex")
        return false;
    }

}

function passConfirmValid() {

    if (uPassConfirm.value === uPass.value) {
        uPassConfirm.classList.add("is-valid")
        uPassConfirm.classList.remove("is-invalid")
        error6.classList.replace("d-flex", "d-none")
        return true;
    }
    else {
        uPassConfirm.classList.add("is-invalid")
        error6.classList.replace("d-none", "d-flex")
        return false;
    }

}

function validation() {
    if (nameValidation() && phoneValidation() && ageValidation() && emailValidation() && passValidation() && passConfirmValid()) {
        submitBtn.removeAttribute("disabled")
    }
    else {
        submitBtn.setAttribute("disabled", "disabled")
    }
}

//search function

async function searchMoviesByWord(searchItem)
{   
    let respones = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchItem}&api_key=428738f72b78f80e7d92b4fcfe26ee94`);
    let list = await respones.json();
    displayMovies(list.results)
}


async function searchMovies(searchItem,categeory)
{   
    let respones = await fetch(`https://api.themoviedb.org/3/${categeory}?api_key=428738f72b78f80e7d92b4fcfe26ee94`);
    let list = await respones.json();
    list = list.results
    let box = "";
    for(let i = 0; i < list.length; i++) {
        if(list[i].title.toLowerCase().includes(searchItem.toLowerCase()))
        {
            box += `<div class="col-md-6 col-lg-4 my-3 px-3">
                        <div class="movie">
                            <img src="https://image.tmdb.org/t/p/w500/${list[i].poster_path}" class="img-fluid rounded-3" alt="">
                            <div class="movie-overlay rounded-3 d-flex flex-column justify-content-center text-center">
                                <p class="movie-title">${list[i].title}</p>
                                <p class="movie-content">${list[i].overview}</p>
                                <p class="movie-content">rate:${list[i].vote_average}</p>
                                <p class="movie-content">${list[i].release_date}</p>
                            </div>
                        </div>
                    </div>`
        }     
    }
    document.getElementById("moviesRow").innerHTML = box;
}



// ***************************** end of functions *****************************


