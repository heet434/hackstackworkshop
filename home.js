const API_KEY = 'api_key=2d94f797d8ffa34252fa53e73ab390be';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list?'+API_KEY;
const searchURL = BASE_URL + '/search/movie?';
const videoURL = 'https://api.themoviedb.org/3/movie/'
addtrailer = function(mov){
    var vid = videoURL + mov + "/videos?" + API_KEY;
    var youtube; var p=0;
    $.getJSON(vid, function(trails){
        console.log(trails.results);
        if(trails.results.length==0){
            $('#clickdetailchild .trailer iframe').attr('src','https://www.youtube.com/embed/y-67bCRIrg4');
        }
       for( x in trails.results ) { if(trails.results[p].type=='Trailer' && trails.results[p].official == true && trails.results[p].site == 'YouTube'){
            youtube = 'https://www.youtube.com/embed/' + trails.results[p].key;
            // console.log(youtube);
            $('#clickdetailchild .trailer iframe').attr('src',youtube);
            break;
       }
       else{
        $('#clickdetailchild .trailer iframe').attr('src','https://www.youtube.com/embed/y-67bCRIrg4');
       };
       p=p+1;
       };
       
    // //    
       
        // console.log(youtube);
    });
    
}

    // $(document).ready(
    //     function(){for(var i=1; i<=15; i++){
    //         $('.thumbnail').click(f(i));
    //     }
    // }    
    // )
    f2 = function(){
        $('#clickdetail').css('visibility','hidden');
        $('#clickdetailchild').css('visibility','hidden');
    }

    var pwidth=$("#content" + 1 + " .rating").width();
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

//genrelist fetched
home = () => {
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
            for(var i=1; i<=15; i++){
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
                    var w = data.results[i-1].vote_average*pwidth/10;
                    $('#content' + i + ' .rating').css("width", w);
                    
                    } 
                    
            for(var j=1; j<=15; j++){
                    f = function(j){
                        $('#clickdetail').css("visibility","visible");
                        $('#clickdetailchild').css("visibility","visible");
                        $('#clickdetailchild .bg').css("background-image","url(" + IMG_URL + data.results[j-1].poster_path + ")");
                        $('#clickdetailchild .bg').css("background-size", "cover");
                        $('#clickdetailchild .name p').text(data.results[j-1].title);
                        $('#clickdetailchild .rating p').text("Rating: " + data.results[j-1].vote_average);
                        $('#clickdetailchild .overview p').text(data.results[j-1].overview);
                        addtrailer(data.results[j-1].id);
                    }
            }
            }     
            )
        .catch(err => console.log('rejected:', err.message));
        $('#searchbar').val('');
};
home();

var myinput;
// moviesearch = () => {
    $(document).ready(function(){
        $('#searchbar').keyup(function(){
            if($('#searchbar').val()==''){home();};
            myinput = $(this).val();

            const getData3 = async () => {
                const response1 = await fetch(searchURL+'query='+myinput+'&'+API_KEY);
                if( response1.status !== 200){
                    throw new Error("search not fetched");
                }
                data = response1.json();
                return data;
            };
            getData3()
                .then(
                    data => {
                        for(var i=1; i<=15; i++){
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
                            var w = data.results[i-1].vote_average*pwidth/10;
                            $('#content' + i + ' .rating').css("width", w);
                            

                            }   
                            
                            for(var j=1; j<=15; j++){
                                f = function(j){
                                    $('#clickdetail').css("visibility","visible");
                                    $('#clickdetailchild').css("visibility","visible");
                                    $('#clickdetailchild .bg').css("background-image","url(" + IMG_URL + data.results[j-1].poster_path + ")");
                                    $('#clickdetailchild .bg').css("background-size", "cover");
                                    $('#clickdetailchild').css("background-blend-mode", "overlay");
                                    $('#clickdetailchild .name p').text(data.results[j-1].title);
                                    $('#clickdetailchild .rating p').text("Rating: " + data.results[j-1].vote_average);
                                    $('#clickdetailchild .overview p').text(data.results[j-1].overview);
                                    addtrailer(data.results[j-1].id);
                                }
                        }

                    }
                    )
                    .catch(err => console.log('rejected', err.message));
                    
                });
    })
// }
