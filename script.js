// Initial reference
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let key = "327cc2bd"

// Function to fetch data from API

searchBtn.addEventListener('click',()=> getMovie());
movieNameRef.addEventListener('keyup',(e)=>{
    if (e.key ==="Enter")
    {
        getMovie();
    }
})

let getMovie = ()=>{
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?s=${movieName}&apikey=${key}`;

    // if the input field is empty
    if (movieName.length <=0){
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
        return;
    }
    // if the input field is not empty
    else{
        fetch(url).then((resp)=>resp.json()).then((data)=>{
            
            console.log(data)

            // if movie exists in the database
            if (data.Response=="True"){
                
                let movies = data.Search;
                let output="";
                movies.forEach((movie)=>{
                    output+=`
                <div class="info">
                            <img src="${movie.Poster}" class="poster">
                            <div>
                                <h2 class="title">${movie.Title}</h2>
                               
                            </div>
                        </div>
                        `;
                })
                 result.innerHTML =output
            }
            else{
                result.innerHTML = `<h3 class="msg">Please enter a vaild movie name</h3>`;
               return;
            }
        })

    }

}
window.addEventListener('load',getMovie);