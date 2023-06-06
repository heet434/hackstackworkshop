const API_KEY = 'api_key=2d94f797d8ffa34252fa53e73ab390be';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list?'+API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

var genrelist;
var glist;
const getData2 = async () => {
    const response1 = await fetch(genreURL);
    if( response1.status !== 200){
        throw new Error("genre list not fetched");
    }
    genrelist = response1.json();
    return genrelist;
};
getData2()
    .then(
        genrelist => {
            var mapped = genrelist.genres.map(item => ({ [item.id]: item.name }) );
            glist = Object.assign({}, ...mapped );
        }
        )
        .catch(err => console.log('rejected', err.message));



const getData1 = async () => {
    const response = await fetch(API_URL);
    if( response.status !== 200){
        throw new Error("error while fetching data");
    }
    const data = response.json();
    return data;
};
getData1()
    .then(data => {console.log('resolved:', data);
        console.log(data.results[0].title);
        for(var i=1; i<=12; i++){
                $('#content' + i + ' .name').text(data.results[i-1].title);
                var allgenres = glist[data.results[i-1].genre_ids[0] ];
                // for(var j=1; j<data.results[i-1].genre_ids.length; j++){
                //     allgenres +' ' + glist[data.results[i-1].genre_ids[j] ];
                // }
                for (j in data.results[i-1].genre_ids){
                    if(j>0){
                    allgenres = allgenres + ',  ' + glist[data.results[i-1].genre_ids[j] ];}
                } 
                $('#content' + i + ' .genre').text(
                    allgenres
                );
                
                $('#content' + i).css("background-image","url(" + IMG_URL + data.results[i-1].poster_path + "), linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%)");
                $('#content' + i).css("background-size", "cover");
                $('#content' + i).css("background-blend-mode", "overlay");
                var w = data.results[i-1].vote_average*$("#content" + i + " .rating").width()/10;
                $('#content' + i + ' .rating').css("width", w);
    
                }    
        }     
        )
    .catch(err => console.log('rejected:', err.message));

