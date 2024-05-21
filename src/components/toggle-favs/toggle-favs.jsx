import React from 'react';
import { Button } from 'react-bootstrap';
import { setUser } from '../../redux/reducers/user';
import { useDispatch, useSelector } from 'react-redux';

export const ToggleFavs = ({ movie }) => {
  const { user, token } = useSelector((state) => state.user);
  const isFav = user.FavoriteMovies.includes(movie.id);
  const dispatch = useDispatch();

  const favorite = () => {
    // fetch(process.env.CONNECTION_URI + `/users/${user.Username}/movies/${movie.id}`, {
    fetch(`http://ec2-54-219-122-97.us-west-1.compute.amazonaws.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("Failed to favorite movie");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(setUser({ user: user, token: token }));
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  const unfavorite = () => {
    // fetch(process.env.CONNECTION_URI + `/users/${user.Username}/movies/${movie.id}`, {
    fetch(`http://ec2-54-219-122-97.us-west-1.compute.amazonaws.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("Failed to unfavorite movie");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(setUser({ user: user, token: token }));
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <>
      {isFav ? (
        <Button onClick={() => unfavorite(movie.id)}>💔</Button>
      ) : (
        <Button onClick={() => favorite(movie.id)}>❤️</Button>
      )}
    </>
  )
};