import { useEffect, useState } from "react";
import StarRatings from "./StarRating";

const results = [
  {
    adult: false,
    backdrop_path: "/yzoyr6nuB3ChA38MSHjYKlMpU6W.jpg",
    genre_ids: [28, 80, 53],
    id: 370076,
    original_language: "ta",
    original_title: "தெறி",
    overview:
      "When an honest cop, Vijay Kumar's family is ruthlessly slaughtered by a politician and his aides, he decides to change his identity and commits his life to bring his daughter up in a serene atmosphere. But some freak events end up compromising his identity and what he does to save his daughter and avenge the death of his family unfurls as Theri.",
    popularity: 7.353,
    poster_path: "/f6BhexotEqO3GejXa3FopBNGL6M.jpg",
    release_date: "2016-04-14",
    title: "Theri",
    video: false,
    vote_average: 6.75,
    vote_count: 76,
  },
];

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133094",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const apiKey = "5e642bdc486454fbe0754536e578099d";
// url=https://api.themoviedb.org/3/search/movie?api_key=${5e642bdc486454fbe0754536e578099d}&query=harry potter

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectId] = useState(null);
  const query1 = "iron man";
  // console.log(query);

  // Get movies from API and store in state
  // console.log(query);

  function handleSelectMovie(id) {
    setSelectId((selectedId) => (id === selectedId ? null : id));
  }
  function handleClosedMovie() {
    setSelectId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.id !== id));
  }
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    async function fetchMovies() {
      try {
        setisLoading(true);
        setError("");
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error("Something went worong with fetching movies");

        if (data.total_results === 0) throw new Error("Movie not found");

        // console.log(data.results);
        setMovies(data.results);
        // data.results.map((movie) => setMovies((movies) => [...movies, movie]));
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setisLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);
  // useEffect(() => {
  //   fetch(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=theri`
  //   )
  //     .then((res) => res.json())
  //     .then((data) =>
  //       data.results.map((movie) => setMovies((movies) => [...movies, movie]))
  //     );
  // }, []);

  // console.log(movies);
  // console.log(tempMovieData);/
  return (
    <>
      <Navbar>
        <Search onsetQuery={setQuery} query={query} />
        <FoundResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {isLoader ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}

          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onClosedMovie={handleClosedMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⚠️</span> {message}
    </p>
  );
}

// -------------------------- navbar component

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo /> {/*-------------------------- Logo component */}
      {children}
      {/*-------------------------- FoundResults component */}
    </nav>
  );
}
// -------------------------- Logo component
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
// -------------------------- Search component
function Search({ onsetQuery, query }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onsetQuery(e.target.value)}
    />
  );
}
// -------------------------- FoundResults component
function FoundResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong> {movies.length} </strong> results
    </p>
  );
}

// ------------------------Main Component

function Main({ children }) {
  return <main className="main">{children}</main>;
}

// function Watchedbox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

//-------------------- boxcomponent

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

// ------------------------------Movielist Component

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} key={movie.id} /> // -------------Movie Component
      ))}
    </ul>
  );
}
// ------------------------------Movie Component  {movie.poster_path} `https://image.tmdb.org/t/p/w500${movie.poster_path}`
function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.id} onClick={() => onSelectMovie(movie.id)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.release_date}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({
  selectedId,
  onClosedMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [moviedetails, setMoviedetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    title,
    release_date: releaseDate,
    genres,
    id,
    overview,
    poster_path,
    credits,
    runtime,
    vote_average: imdbrating,
  } = moviedetails;
  // to check the movie is lised or not
  const isListed = watched.map((movie) => movie.id).includes(selectedId);
  const watcheduserRating = watched.find(
    (movie) => movie.id === selectedId
  )?.userRating;
  console.log(watcheduserRating);

  function handleAdd() {
    const newMovie = {
      id,
      title,
      releaseDate,
      poster_path,
      imdbrating: Number(imdbrating),
      runtime,
      userRating,
    };
    onAddWatchedMovie(newMovie);
    onClosedMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedId}?api_key=${apiKey}&append_to_response=credits`
        );
        const data = await res.json();
        // console.log("data", data);
        setMoviedetails(data);
      } catch (err) {
        console.log("err", err);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  // if (credits !== undefined) {
  //   console.log(moviedetails);
  // }
  // if (credits !== undefined) {
  //   console.log(
  //     credits.crew
  //       .filter(({ job }) => job === "Director")
  //       .slice(0, 1)
  //       .map(({ name }) => name)
  //   );
  // }

  // console.log(moviedetails.credits.crew.map((act) => act.name));
  // credit.map((cast) => {
  //   cast.name;
  // });
  return (
    <div className="details">
      {!isLoading ? (
        <>
          <header>
            <button className="btn-back" onClick={onClosedMovie}>
              &larr;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={`${title} poster`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {releaseDate} &bull; {runtime} min
              </p>
              <p>
                {genres !== undefined
                  ? genres.map(
                      (gen, index) =>
                        `${gen.name} ${genres.length - 1 > index ? "," : ""} `
                    )
                  : null}
              </p>
              <p>
                <span>⭐</span>
                {imdbrating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isListed ? (
                <>
                  {" "}
                  <StarRatings
                    maxRating={10}
                    size={22}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated with movie {watcheduserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{overview}</em>
            </p>
            <p>
              Starring{" "}
              {credits !== undefined
                ? credits.cast
                    .slice(0, 5)
                    .map((act, index) => `${act.name} ${4 > index ? "," : ""} `)
                : null}
            </p>
            <p>
              Directed by{" "}
              {credits !== undefined
                ? credits.crew
                    .filter(({ job }) => job === "Director")
                    .slice(0, 1)
                    .map(({ name }) => name)
                : null}
            </p>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbrating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdb_id}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbrating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.id)}
        >
          X
        </button>
      </div>
    </li>
  );
}

// to rounded value
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
