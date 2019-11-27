import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TmdbConfigContext from './TmdbConfigContext';
import './movie-item.scss';

const MovieItem = ({ data, handleMovieItemClick }) => {
  // warning: config can be null while waiting to fetch config data
  const { config } = useContext(TmdbConfigContext);
  const { poster_path } = data;
  const secure_base_url = config && config.images.secure_base_url;

  const widthViewportMap = {
    w500: '1200px',
    w300: '992px',
    w185: '768px',
    w154: '402px'
  };

  const renderSources = () =>
    Object.entries(widthViewportMap).map(([imgWidth, viewPortWidth]) => {
      return (
        <source
          key={`${imgWidth}_${viewPortWidth}`}
          media={`(min-width: ${viewPortWidth}`}
          srcSet={`${secure_base_url}${imgWidth}${poster_path}`}
        />
      );
    });

  return (
    <li
      className="movie-item card border-primary"
      key={data.id}
      data-movie-id={data.id}
      onClick={() => handleMovieItemClick(data.id)}
    >
      <div className="card-body">
        {config && (
          <picture>
            {renderSources()}
            <img
              src={`${secure_base_url}w154${poster_path}`}
              alt={`${data.title}`}
              width="100%"
              // setting a width=100% on this fallback image will also properly constrain the <source> elements before it
            />
          </picture>
        )}
      </div>
      <button className="card-title small text-primary">{data.title}</button>
    </li>
  );
};

MovieItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired
  }).isRequired,
  handleMovieItemClick: PropTypes.func.isRequired
};

export default MovieItem;
