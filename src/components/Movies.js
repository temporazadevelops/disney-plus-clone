import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tmbd from "../tmbd";

const Movies = () => {
  const getPosterPath = (poster) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster}`;
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // DEFAULT WAY TO APPLY AXIOUS
    // axios
    //   .get(
    //     "https://api.themoviedb.org/3/movie/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
    //   )
    //   .then((response) => setMovies(response.data.results))
    //   .catch((error) => console.log(error));

    // STANDARD WAY TO APPLY AXIOUS
    const fecthMovies = async () => {
      const { data } = await tmbd.get("movie/popular");
      setMovies(data.results);
    };

    fecthMovies();
  }, []);

  return (
    <Container>
      <h4>Recomended for you</h4>
      <Content>
        {movies.map((movie, index) => {
          return (
            <Wrap key={index}>
              <img src={getPosterPath(movie.poster_path)} alt="" />
            </Wrap>
          );
        })}
      </Content>
    </Container>
  );
};

export default Movies;

const Container = styled.div`
  margin-top: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;
const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    border-color: rgba(249, 249, 249, 0.8);
    transform: scale(1.05);
  }
`;
