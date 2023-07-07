import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Slider from '../../components/slider'
import {
  getMovies,
  getPopularSeries,
  getTopMovies,
  getTopPeople,
  getTopSeries,
  getUpcomming
} from '../../services/getData'
import { getImages } from '../../utils/getImages'
import { Background, Info, Poster, Container, ContainerButtons } from './styles'

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [movie, setMovie] = useState()
  const [topMovie, setTopMovie] = useState()
  const [topSeries, setTopSeries] = useState()
  const [popularSeries, setPopularSeries] = useState()
  const [upcoming, setUpcoming] = useState()
  const [topPeople, setTopPeople] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function getAllData() {
      Promise.all([
        getMovies(),
        getTopMovies(),
        getTopSeries(),
        getPopularSeries(),
        getUpcomming(),
        getTopPeople()
      ])
        .then(
          ([
            movie,
            topMovie,
            topSeries,
            popularSeries,
            upcoming,
            topPeople
          ]) => {
            setMovie(movie)
            setTopMovie(topMovie)
            setTopSeries(topSeries)
            setPopularSeries(popularSeries)
            setUpcoming(upcoming)
            setTopPeople(topPeople)
          }
        )
        .catch((error) => console.error(error))
    }

    getAllData()
  }, [])

  return (
    <>
      {movie && (
        <Background img={getImages(movie.backdrop_path)}>
          {showModal && (
            <Modal movieId={movie.id} setShowModal={setShowModal} />
          )}
          <Container>
            <Info>
              <h1> {movie.title} </h1>
              <p> {movie.overview} </p>
              <ContainerButtons>
                <Button
                  red={true}
                  onClick={() => navigate(`/detalhe/${movie.id}`)}
                >
                  Assistir agora
                </Button>
                <Button onClick={() => setShowModal(true)}>
                  Assista ao trailer
                </Button>
              </ContainerButtons>
            </Info>
            <Poster>
              <img alt="moviePoster-image" src={getImages(movie.poster_path)} />
            </Poster>
          </Container>
        </Background>
      )}
      {topMovie && <Slider info={topMovie} title={'Top filmes'} />}
      {topSeries && <Slider info={topSeries} title={'Top séries'} />}
      {popularSeries && (
        <Slider info={popularSeries} title={'Séries populares'} />
      )}
      {upcoming && <Slider info={upcoming} title={'Em breve'} />}
      {topPeople && <Slider info={topPeople} title={'Top artístas'} />}
    </>
  )
}

export default Home
