import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// React Components
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MoviesList } from '../movies-list/movies-list';

// Redux Components
import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Storing user and token in local storage.
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      dispatch(setUser({ user: storedUser, token: storedToken }));
    }
  }, [dispatch]);

  // Connect to api
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(process.env.CONNECTION_URI + 'movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            genreName: movie.Genre.Name,
            director: movie.Director.Name
          };
        });
        dispatch(setMovies(moviesFromApi))
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user && token ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user && token ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user || !token ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user || !token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user || !token ?
                  <Navigate to="/login" replace /> : <MoviesList />
                }
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};