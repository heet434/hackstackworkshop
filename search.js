// // const API_KEY = 'api_key=2d94f797d8ffa34252fa53e73ab390be';
// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
// const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const genreURL = 'https://api.themoviedb.org/3/genre/movie/list?'+API_KEY;
// const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const getData3 = async () => {
    const response1 = await fetch(API_URL);
    if( response1.status !== 200){
        throw new Error("data not fetched");
    }
    data = response1.json();
    return data;
};
getData3()
    .then(
        data => {
           moviesearch = () => {
            let input = $('#searchbar').val;
            

           }
        }
        )
        .catch(err => console.log('rejected', err.message));

