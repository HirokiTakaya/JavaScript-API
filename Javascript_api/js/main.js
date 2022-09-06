// alert("connected");
// ****************************************************************************
// ****************************************************************************
//
//          Final Exam
//
//  Instructions:
//      Make sure to always provide meaningful feedback to the user
//          (not just the name or number, talk to the user as if they are
//           standing in front of you)
//
//      Preload the Movie Object with Data from TMDB (1 page of trending movies)
//
//      Section 1 should allow the user to add as many movies and showtimes as they want
//
//      Section 2 should allow the user to scroll through movies and showtimes
//              let the user click the Pick Movie button to populate Section 3
//
//      Section 3 should allow the user to buy a ticket for a movie/showtime
//          Section 3 requires:
//              you to get the movie from the user
//              you to get the showtime from the user
//              you to get the number of tickets from the user
//              use the movie and showtime to get the ticket price
//                  (remember that diff showtimes may have diff costs)
//                  (also, for this exercise, there are no discount seats)
//
//              calculate the total price as:
// ****************************************************************************
//  ===============> (ticket price * number of tickets * 1.15 (to add tax))
// ****************************************************************************
//              Display this amount back to the user in a meaningful way
//
// ****************************************************************************

// ****************************************************************************
// ****************************************************************************
// ****************************************************************************

// ****************************************************************************
//      Start of Program
// ****************************************************************************
// ****************************************************************************
//          Variable Declarations
// ****************************************************************************
// ****************************************************************************
//  Full-Scope Variables
let movieObjectsArray = [];
let currentIndex = 0;
let moviePrice = 0;
const apiKey = "bc1250e71dfee020b4f147ad56240af9";
const discoverMovieURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const trendingMovieURL = `https://api.themoviedb.org/3/trending/movie/week?sort_by=popularity.desc&api_key=${apiKey}&page=1`;
const searchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const searchPerson = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=`;
// ****************************************************************************
//  Pull Movies from API and Load the Movie Array
//
//  Show times are base on rating:
//      movies with ratings of at least 4 will be shown at 11am
//      movies with ratings of at least 6 will be shown at 11am and 2pm
//      movies with ratings of at least 7 will be shown at 11am, 2pm, and 5pm
//      movies with ratings above 8 will be shown at 11am, 2pm, 5pm, and 8pm
//
//  Prices:
//      11am - $4.99
//      2pm - $6.99
//      5pm - $8.99
//      8pm - $11.99
//
//  Grades:
//      option 1: Load movie and times via a switch statement with fall-through - max 100% for section
//      option 2: Load movie and times via a switch statement - max 90% for section
//      option 3: Load movie and times via an if-statement - max 80% for section
//
//      For example: 
//          if you get 8/10 on the section and you implemented option 1 you get 8 marks 
//          if you get 8/10 on the section and you implemented option 2 you get 7 marks
//          if you get 8/10 on the section and you implemented option 3 you get 6.5 marks
//
//      Sample Object:
//          const movieObj = {
//              movieName: title,
//              showtime: showtime,
//              price: price
//          }
// 
// ****************************************************************************
// Populate the Movie Table - 10 marks
getMovies(discoverMovieURL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json()


    let movieData = data.results;


    console.log(movieData);
    for (let i = 0; i < movieData.length; i++) {

        let ratings = movieData[i].vote_average;
        console.log(ratings)

        let showtime = 0

        switch (true) {
            case (ratings >= 8):
                showtime = ['11am', '2pm', '5pm', '8pm'];
                break;
            case (ratings >= 7):
                showtime = ['11am', '2pm', '5pm'];
                break;
            case (ratings >= 6):
                showtime = ['11am', '2pm'];
                break;
            case (ratings >= 4):
                showtime = ['11am'];
                break;
            default:

        }

        for (let j = 0; j < showtime.length; j++) {

            let price = 0
            switch (showtime[j]) {
                case '11am':
                    price = 4.99;
                    break;
                case '2pm':
                    price = 6.99;
                    break;
                case '5pm':
                    price = 8.99;
                    break;
                case '8pm':
                    price = 11.99;
                    break;
                default:
                    price = 0


            }


            let obj = {
                movieName: movieData[i].title,
                showtime: showtime[j],
                price: price,

            };
            movieObjectsArray.push(obj)


            //  Prices:
            //      11am - $4.99
            //      2pm - $6.99
            //      5pm - $8.99
            //      8pm - $11.99   
        }
        console.log(showtime)


    } console.log(movieObjectsArray)


}



// ****************************************************************************
// ****************************************************************************
//  Function Variables


// ****************************************************************************
// ****************************************************************************
//      Event Listeners
// ****************************************************************************
// ****************************************************************************
//  Load Movie Array - 10 marks
addMovie.addEventListener('click', (event) => {
    let movie = document.getElementById('c1Movie').value
    let time = document.getElementById('c1Time').value
    let price = document.getElementById('c1Price').value
    let newobj = {

        movieName: movie,
        showtime: time,
        price: price

    }
    movieObjectsArray.push(newobj)

})

// ****************************************************************************
// ****************************************************************************
//  View the Available Movies - 5 marks
load.addEventListener('click', () => {
    let availm = document.getElementById('c2Movie')
    let availt = document.getElementById('c2Time')
    let availp = document.getElementById('c2Price')
    console.log(movieObjectsArray[0])
    console.log(movieObjectsArray[0].movieName)

    currentIndex = 0

    availm.value = movieObjectsArray[currentIndex].movieName
    availt.value = movieObjectsArray[currentIndex].showtime
    availp.value = movieObjectsArray[currentIndex].price

    prev.disabled = false
    next.disabled = false
    pickMovie.disabled = false


})

// ****************************************************************************
// ****************************************************************************
//  Navigate through the Showtimes - 5 marks each (so 15 marks for this section)
next.addEventListener('click', () => {

    let availm = document.getElementById('c2Movie')
    let availt = document.getElementById('c2Time')
    let availp = document.getElementById('c2Price')


    currentIndex += 1
    if (currentIndex == movieObjectsArray.length) {
        currentIndex = 0
    }

    availm.value = movieObjectsArray[currentIndex].movieName
    availt.value = movieObjectsArray[currentIndex].showtime
    availp.value = movieObjectsArray[currentIndex].price


})

prev.addEventListener('click', () => {

    let availm = document.getElementById('c2Movie')
    let availt = document.getElementById('c2Time')
    let availp = document.getElementById('c2Price')

    currentIndex -= 1

    if (currentIndex < 0) {
        currentIndex = movieObjectsArray.length - 1
    }

    availm.value = movieObjectsArray[currentIndex].movieName
    availt.value = movieObjectsArray[currentIndex].showtime
    availp.value = movieObjectsArray[currentIndex].price



}
)
pickMovie.addEventListener('click', () => {
    let pMovie = document.getElementById('c3Movie')
    let pTime = document.getElementById('c3Time')
    let pTotal = document.getElementById('c3Total')

    pMovie.value = c2Movie.value
    pTime.value = c2Time.value
    moviePrice = c2Price.value

})

// ****************************************************************************
// ****************************************************************************
//  Calculate Ticket Price - 10 marks






calcTotal.addEventListener('click', () => {
    let price = c3NumTickets.value * moviePrice * 1.15
    document.getElementById('c3Output')
    c3Total.value = price


})