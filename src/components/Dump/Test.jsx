import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
  const [data, setData] = useState([]);
  const [selectedTalukaIndex, setSelectedTalukaIndex] = useState(0);
  const [selectedAgeCategory, setSelectedAgeCategory] = useState('Total');
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://mehdb.vercel.app/agepops');
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const populateAgeCategories = (talukaData) => {
    const ageCategories = Object.keys(talukaData).filter((property) =>
      /^\d/.test(property)
    );

    return (
      <>
        <option value="Total">Total</option>
        {ageCategories.map((category) => (
          <option key={category} value={category}>
            {category.replace(/_/g, ' ')}
          </option>
        ))}
      </>
    );
  };

  const getSelectedTalukaData = () => {
    try {
      const talukaData = data[selectedTalukaIndex];
      const total =
        selectedAgeCategory === 'Total'
          ? talukaData.Total
          : talukaData[selectedAgeCategory];

      setResult(
        `<p>Total for ${talukaData.Taluka} (${selectedAgeCategory}): ${total}</p>`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleTalukaChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedTalukaIndex(selectedIndex);
  };

  const handleAgeCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedAgeCategory(selectedCategory);
  };

  return (
    <div>
      <h1>Taluka Data App</h1>

      <label htmlFor="talukaSelect">Select Taluka: </label>
      <select
        id="talukaSelect"
        value={selectedTalukaIndex}
        onChange={handleTalukaChange}
      >
        {data.map((talukaData, index) => (
          <option key={index} value={index}>
            {talukaData.Taluka}
          </option>
        ))}
      </select>

      <label htmlFor="ageCategorySelect">Select Age Category: </label>
      <select
        id="ageCategorySelect"
        value={selectedAgeCategory}
        onChange={handleAgeCategoryChange}
      >
        {data.length > 0 &&
          populateAgeCategories(data[selectedTalukaIndex])}
      </select>

      <button onClick={getSelectedTalukaData}>Get Taluka Data</button>

      <div
        id="result"
        dangerouslySetInnerHTML={{ __html: result }}
      ></div>
    </div>
  );
};

export default Test;
