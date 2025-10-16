import noImage from '../src/assets/images.jpeg';

const Card = ({ movie }) => {
  return (
    <div>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : noImage}
        alt={movie.Title}
        onError={(e) => {
          e.target.src = noImage;
          e.target.src = '../src/assets/images.jpeg'
        }}
      />
      <div>
        <p>{movie.Title}</p>
        <p>{movie.Type}</p>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default Card;