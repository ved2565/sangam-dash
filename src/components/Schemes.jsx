import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scheme = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('https://mehdb.vercel.app/addScheme');

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        setSchemes(response.data); // Assuming the response is an array of schemes
      } catch (error) {
        console.error('Error fetching schemes:', error.message);
      }
    };

    fetchSchemes();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      <h2>Scheme List</h2>
      <ul>
        {schemes.map((scheme) => (
          <li key={scheme.id}>{scheme.schemename}</li>
        ))}
      </ul>
    </div>
  );
};

export default Scheme;
