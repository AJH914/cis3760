import React from 'react';
import CourseResult from './CourseResult';

const SearchResults = ({ id, results }) => {
  return (
    <div className='accordion' id={`${id}-accordion`}>
      {results.map((result) => (
        <CourseResult key={result.id} accordion={id} data={result} />
      ))}
    </div>
  );
};

export default SearchResults;
