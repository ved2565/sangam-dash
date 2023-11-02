import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainNavbar from './MainNavbar';

const TestData = () => {
  const [data, setData] = useState([]);
  const [selectedTaluka, setSelectedTaluka] = useState(0);
  const [selectedAgeCategory, setSelectedAgeCategory] = useState('Total');
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://mehdb.vercel.app/agepops');
        setData(response.data);

        // Get the first taluka's age categories to set default values
        const firstTalukaData = response.data[0];
        populateAgeCategories(firstTalukaData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const populateAgeCategories = (talukaData) => {
    const ageCategories = Object.keys(talukaData).filter(property => /^\d/.test(property));
    const options = ['Total', ...ageCategories.map(category => category.replace(/_/g, ' '))];

    setSelectedAgeCategory('Total');
    setAgeCategoryOptions(options);
  };

  const setAgeCategoryOptions = (options) => {
    // Update age category select options
    const ageCategorySelect = document.getElementById('ageCategorySelect');
    ageCategorySelect.innerHTML = '';

    options.forEach((option, index) => {
      const optionElement = document.createElement('option');
      optionElement.value = index;
      optionElement.text = option;
      ageCategorySelect.add(optionElement);
    });
  };

  const getSelectedTalukaData = () => {
    try {
      const talukaData = data[selectedTaluka];
      const total = selectedAgeCategory === 'Total' ? talukaData.Total : talukaData[selectedAgeCategory];

      setResult(`Total for ${talukaData.Taluka} (${selectedAgeCategory}): ${total}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="bg-orange-400 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Taluka Data App</h1>
      <div className="mb-4">
        <label htmlFor="talukaSelect" className="mr-2">
          Select Taluka:
        </label>
        <select
          id="talukaSelect"
          className="p-2 border rounded"
          value={selectedTaluka}
          onChange={(e) => {
            setSelectedTaluka(parseInt(e.target.value, 10));
            const selectedTalukaData = data[parseInt(e.target.value, 10)];
            populateAgeCategories(selectedTalukaData);
          }}
        >
          {data.map((talukaData, index) => (
            <option key={index} value={index}>
              {talukaData.Taluka}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="ageCategorySelect" className="mr-2">
          Select Age Category:
        </label>
        <select
          id="ageCategorySelect"
          className="p-2 border rounded"
          value={selectedAgeCategory}
          onChange={(e) => setSelectedAgeCategory(e.target.value)}
        ></select>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={getSelectedTalukaData}
      >
        Get Taluka Data
      </button>

      <div id="result" className="mt-4">{result}</div>
    </div>
    </>
  );
};

export default TestData;
