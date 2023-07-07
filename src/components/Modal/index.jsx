import { useEffect, useState } from 'react'

import { getMovieVideos } from '../../services/getData'
import { Container, Background } from './styles'

function Modal({ movieId, setShowModal }) {
  const [movie, setMovie] = useState()

  useEffect(() => {
    async function getMovies() {
      setMovie(await getMovieVideos(movieId))
    }

    getMovies()
  }, [])
  console.log(movie)

  return (
    <Background onClick={() => setShowModal(false)}>
      {movie && (
        <Container>
          <iframe
            src={`https://www.youtube.com/embed/${movie[1].key}`}
            title="Youtube Video Player"
            height="480px"
            width="100%"
          ></iframe>
        </Container>
      )}
    </Background>
  )
}

export default Modal
