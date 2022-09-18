import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {/* Detail()실행순서 return-useEffect 이기 때문에 api가져오기전에 에러 발생
        그렇기 때문에 loading 스테이트를 통해 api를 가져온후 출력되게끔 해주는 것
      */}{' '}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img alt={movie.title} src={movie.medium_cover_image} />
          <ul>
            {movie.genres.map((g) => (
              <li key={g}> {g} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Detail;
