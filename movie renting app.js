class Movie {
  constructor(title, genre, country, releasedYear, availableCopies, price) {
    this.title = title;
    this.genre = genre;
    this.country = country;
    this.releasedYear = releasedYear;
    this.availableCopies = availableCopies;
    this.price = 10;
  }
  getTitle() {
    return this.title;
  }
}

class MovieStore {
  constructor(movies) {
    this.movies = [];
  }

  addMovies() {
    this.movies.push(new Movie());
  }

  displayMovies() {
    for (let i = 0; i < movieStore.movies.length; i++) {
      console.log(movieStore.movies[i].title);
    }
  }
}

class Renter {
  constructor(name, phoneNumber, address, city, state) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.city = city;
    this.state = state;
  }
}

const movie1 = new Movie("Ben10", "Anime", "Japan", "2009", "3");
const movie2 = new Movie("Zuma", "Adventure", "Chinese", "2012", "0");
const movie3 = new Movie("The Heist", "Action", "United States", "2023", "5");
const movie4 = new Movie("Silence", "Horror", "Italian", "2024", "10");

console.log(movie1, movie2, movie3, movie4);

const renter1 = new Renter(
  "Obinna",
  "08067363737",
  "Odenigwe",
  "Nsukka",
  "Enugu"
);
const renter2 = new Renter("Ogechi", "0806736537", "Onuiyi", "Nsukka", "Enugu");
const renter3 = new Renter("Ekene", "08085363737", "Obukpa", "Nsukka", "Enugu");
console.log(renter1, renter2, renter3);
