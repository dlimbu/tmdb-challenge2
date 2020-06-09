const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const AssetServer = "https://api.themoviedb.org/3/movie/popular";

/**
 * @todo:
 * call get with the correct url
 * https://api.themoviedb.org/3/movie/popular
 * and return the data
 */
export const getMovies = async()=> {
    const moviesList = await get(`${AssetServer}?api_key=`+apiKey)
    return moviesList;
};

const get = (url)=> {
    return fetch(url, {
        'Accept': 'application/json',
    }).then(response => {
        return response.json();
    })
};

