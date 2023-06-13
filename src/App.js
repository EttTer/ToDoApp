import Modal from "./components/Modal";
import data from "./components/data";
import { useState, useReducer } from "react";

const reducer = (state, action) => {
  if (action.type === "ADD_MOVIE") {
    const newMovies = [...state.movies, action.payload];

    return {
      ...state,
      movies: newMovies,
      showNotification: true,
      notificationContent: "položka byla přidána",
    };
  }

  if (action.type === "NO_MOVIE_NAME") {
    return {
      ...state,
      showNotification: true,
      notificationContent: "Zadejte položku",
    };
  }

  if (action.type === "CLOSE_NOTIFICATION") {
    return {
      ...state,
      showNotification: false,
    };
  }

  if (action.type === "REMOVE_MOVIE") {
    const filteredMovies = state.movies.filter((oneMovie) => {
      return oneMovie.id !== action.payload;
    });
    return {
      ...state,
      movies: filteredMovies,
    };
  }

  return new Error("Chyba - žádná shoda s action.type");

  //return state
};

const defaultState = {
  movies: [],
  showNotification: false,
  notificationContent: "",
};

function App() {
  //nahradíme useReducer  const [movies,setMovies]=useState(data)
  //const [showNotification,setShowNotification]=useState(false)
  const [movieName, setMovieName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const submitForm = (e) => {
    e.preventDefault();
    if (movieName) {
      const newMovie = { id: new Date().getTime(), name: movieName };
      dispatch({
        type: /*tady je jediný rozdíl, co napíšeme mezi uvozovky*/ "ADD_MOVIE",
        payload: newMovie,
      });
    } else {
      dispatch({ type: "NO_MOVIE_NAME" });
    }
    setMovieName("");
  };

  const closeNotification = () => {
    dispatch({ type: "CLOSE_NOTIFICATION" });
  };

  return (
    <section className="form">
      {state.showNotification && (
        <Modal
          notifContent={state.notificationContent}
          closeNotif={closeNotification}
        />
      )}
      <form onSubmit={submitForm}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input type="submit" value="Přidat" />
      </form>
      <div>
        {state.movies.map((oneMovie) => {
          return (
            <div key={oneMovie.id} className="all-movies">
              <p>{oneMovie.name}</p>
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "REMOVE_MOVIE", payload: oneMovie.id })
                }
              >
                Smazat
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default App;
