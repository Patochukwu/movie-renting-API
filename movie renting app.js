const readline = require("readline");

class Movie {
  static id = 0;

  constructor(title, genre, country, releasedYear, availableCopies, price) {
    this.title = title;
    this.genre = genre;
    this.country = country;
    this.releasedYear = releasedYear;
    this.availableCopies = availableCopies;
    this.price = 10;

    this.id = ++Movie.id;
  }
}

class MovieStore {
  static movies = [];

  static addMovie(movie) {
    MovieStore.movies.push(movie);
  }

  static addMovies(movies) {
    for (const movie of movies) {
      MovieStore.movies.push(movie);
    }
  }

  static displayMovies() {
    for (const movie of MovieStore.movies) {
      console.log(movie.title);
    }
  }

  static displayRentables() {
    for (const movie of MovieStore.movies) {
      if (+movie.availableCopies > 0) {
        console.log(`${movie.id}>> ${movie.title}`);
      }
    }
  }
}

class Renter {
  #rents;

  constructor(name, phoneNumber, address, city, state) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.city = city;
    this.state = state;

    this.#rents = [];
  }

  rentedMovies() {
    return console.log(this.#rents);
  }

  rentMovie(movie_id) {
    if (this.#rents.length == 2) {
      console.log(
        "I am sorry you can't rent another movie. Return a rented movie to perform this action."
      );
      return;
    }

    for (let i = 0; i < MovieStore.movies.length; i++) {
      if (movie_id == MovieStore.movies[i].id) {
        if (MovieStore.movies[i].availableCopies == 0) {
          console.log("Sorry, this movie is not available for rent.");
          return;
        }
        this.#rents.push(MovieStore.movies[i]);
        MovieStore.movies[i].availableCopies--;
        console.log(`${MovieStore.movies[i].title} rented successfully`);
      }
    }
  }

  removeRent(movie_id) {
    const index = this.#rents.findIndex((movie) => movie.id === movie_id);
    if (index !== -1) {
      const removedMovie = this.#rents.splice(index, 1)[0];
      MovieStore.movies.find((movie) => movie.id === movie_id)
        .availableCopies++;
      console.log(`${removedMovie.title} removed from rented movies.`);
    } else {
      console.log(
        `Movie with ID ${movie_id} not found in the rented movies list.`
      );
    }
  }

  displayMyRents() {
    if (this.#rents.length == 0) {
      console.log("You haven't rented any movies yet");
    }
    for (const movie of this.#rents) {
      console.log(`${movie.id}>> ${movie.title}`);
    }
  }
}

// Function to display the available commands
function displayCommands() {
  console.log("\nAvailable Commands:");
  console.log("1. display-movies - Display available movies");
  console.log("2. display-rentables - Display rentable movies");
  console.log("3. rent-movie <movie_id> - Rent a movie by its ID");
  console.log("4. remove-rent <movie_id> - Remove a rented movie by its ID");
  console.log("5. my-rents - Display rented movies");
  console.log("6. exit - Exit the application");
}

// Initialize movie store and some movies
MovieStore.addMovies([
  new Movie("Ben10", "Anime", "Japan", "2009", "3"),
  new Movie("Zuma", "Adventure", "Chinese", "2012", "0"),
  new Movie("The Heist", "Action", "United States", "2023", "5"),
  new Movie("Silence", "Horror", "Italian", "2024", "10"),
]);

// Initialize renter
const renter = new Renter(
  "User",
  "123456789",
  "Sample Address",
  "Sample City",
  "Sample State"
);

// Create interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Main loop to read and process commands
function mainLoop() {
  rl.question(
    '\nEnter a command (type "help" for available commands): ',
    (input) => {
      const [command, ...args] = input.split(" ");

      switch (command) {
        case "help":
          displayCommands();
          break;
        case "display-movies":
          MovieStore.displayMovies();
          break;
        case "display-rentables":
          MovieStore.displayRentables();
          break;
        case "rent-movie":
          if (args.length === 1) {
            renter.rentMovie(parseInt(args[0]));
          } else {
            console.log("Invalid command. Usage: rent-movie <movie_id>");
          }
          break;
        case "remove-rent":
          if (args.length === 1) {
            renter.removeRent(parseInt(args[0]));
          } else {
            console.log("Invalid command. Usage: remove-rent <movie_id>");
          }
          break;
        case "my-rents":
          renter.displayMyRents();
          break;
        case "exit":
          console.log("Exiting the application.");
          rl.close();
          return;
        default:
          console.log('Unknown command. Type "help" for available commands.');
      }

      mainLoop(); // Continue the loop
    }
  );
}

// Start the application
console.log("Welcome to the Movie Rental CLI App!");
displayCommands();
mainLoop();
