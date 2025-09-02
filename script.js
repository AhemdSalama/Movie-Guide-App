// Initial reference
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let key = "327cc2bd"

// Function to fetch data from API

searchBtn.addEventListener('click', () => getMovie());
movieNameRef.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        getMovie();
    }
})

let getMovie = async () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?s=${movieName}&apikey=${key}`;

    const resp = await fetch(url);
    const data = await resp.json();

    // if the input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
        return;
    }
    // if the input field is not empty
    else {
        if (data.Response == "True") {

            let movies = data.Search;
            let output = "";

            for (const movie of movies){
                let movieTitle = movie.Title.replaceAll(" ", "-");
                let movieUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${key}`;
                console.log(movieUrl)
                const movieData = await getSingleMovieRecord(movieUrl);
                console.log(movieData);
                output += `
                    <div class="card">
        <div class="card-img">
            <img src="${movieData.Poster}" alt="">
        </div>
        <div class="card-info">
            <div class="card-title">${movieData.Title}</div>
            <div class="card-meta">${movieData.Rated} / ${movieData.Runtime} / ${movieData.Genre}</div>
            <!-- <div class="card-stats">
                <span><i class="fa fa-eye"></i>124</span>
                <span><i class="fa fa-heart"></i>3</span>
            </div> -->
            <div class="card-summary">
                <h3>SUMMARY</h3>
                <p>${movieData.Plot}</p>
            </div>
            <div class="card-actors">
                ${movieData.Actors}
            </div>
            <div class="card-actions">
                <a href="#" class="watch-trailer"><i class="fa fa-play"></i>WATCH TRAILER</a>
                <button title="Add to favorites"><i class="fa fa-bookmark"></i></button>
                <button title="Share"><i class="fa fa-share-alt"></i></button>
            </div>
        </div>
    </div>
                `;
            }
            result.innerHTML = output
            // console.log(output)
        }
        else {
            result.innerHTML = `<h3 class="msg">Please enter a vaild movie name</h3>`;
            return;
        }
    }
}

let getSingleMovieRecord = async (url)=>{
    const movieResp = await fetch(url);
    const movieData = await movieResp.json();
    return movieData;

}
window.addEventListener('load', getMovie);