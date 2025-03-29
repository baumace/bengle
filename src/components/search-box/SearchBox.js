import React, { useCallback, useContext, useEffect, useState } from "react";
import "./SearchBox.css";
import { AppContext } from "../../App";

let inputUserText = "";

function SearchBox({ placeholder, data, disabled }) {
  let keyCount = 0;
  const { selectPlayer } = useContext(AppContext);
  const [filteredData, setFilteredData] = useState([]);
  const [dataItemIndex, setDataItemIndex] = useState({ index: -1 });
  const [search, setSearch] = useState("");

  // Handle the selection of a data entry
  const handleSelection = (value) => {
    // Select the passed value
    selectPlayer(value);

    // Reset the filtered data in the search results
    setFilteredData(filteredData.slice(0, 0));

    // Clear the search bar input text
    setSearch("");

    // Reset the data item index to -1
    setDataItemIndex({ ...dataItemIndex, index: -1 });
  };

  // Search bar selection
  const handleKeyboard = useCallback((event) => {
    // Does the filtered data have elements in it?
    if (filteredData.length !== 0) {
      // Was a key of interest pressed by the user?
      if (event.key === "Enter") {
        // The enter key was pressed
        // Stores the entry from the search results
        let dataEntry;

        // Is the data item index -1 (the input text index)?
        if (dataItemIndex.index === -1) {
          // Select the first element in the search results
          dataEntry = filteredData[0];
        } else {
          // Select the element at the data item index
          dataEntry = filteredData[dataItemIndex.index];
        }

        // Handle the selection of the data point
        handleSelection(dataEntry);
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        // One of the arrow keys of interest was pressed
        // Prevent the key from moving the input text cursor
        event.preventDefault();

        // Store the current index for the data item cursor
        let currDataIndex = dataItemIndex.index;

        // Which key was pressed and is the data item index in an
        // acceptable range?
        if (
          event.key === "ArrowDown" &&
          currDataIndex < 3 &&
          currDataIndex < filteredData.length - 1
        ) {
          // Arrrow key up has been pressed
          // Is the index at the starting position?
          if (currDataIndex === -1) {
            // Store the current input text
            inputUserText = search;
          }

          // Increment the index for the data item
          setDataItemIndex({
            ...dataItemIndex,
            index: dataItemIndex.index + 1,
          });

          // Set the input text to be the newly selected player
          setSearch(filteredData[++currDataIndex].name);
        } else if (event.key === "ArrowUp" && currDataIndex > -1) {
          // Decrement the index for the data item
          setDataItemIndex({
            ...dataItemIndex,
            index: dataItemIndex.index - 1,
          });

          // Is the index anything other than the top element?
          if (currDataIndex !== 0) {
            // Set the input text to be the newly selected player
            setSearch(filteredData[--currDataIndex].name);
          } else {
            // The data item will return to the input box, so reset the input text
            // to the most recent text put in the input text
            setSearch(inputUserText);
          }
        }
      }
    }
  });

  // Search bar selection
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  // Data filter for autocompletion
  const handleFilter = (event) => {
    // Store the text typed to the input
    const inputWord = event.target.value;

    // Show the text typed to the input
    setSearch(inputWord);

    // Filter the data based on the input
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(inputWord.toLowerCase());
    });

    // Is the input word blank?
    if (inputWord === "") {
      // Set filtered data to empty
      setFilteredData([]);
    } else {
      // Set filtered data to contain the filtered players
      setFilteredData(newFilter);
    }

    return;
  };

  return (
    <div className="searchBox">
      <div className="searchInput">
        <input
          type="text"
          className="searchInputText"
          id={filteredData.length !== 0 ? "active" : "inactive"}
          value={search}
          placeholder={placeholder}
          onChange={handleFilter}
          disabled={disabled}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="searchResult" id={filteredData.length}>
          {filteredData.slice(0, 4).map((value) => {
            return (
              <div
                className="dataItem"
                onClick={() => handleSelection(value)}
                key={keyCount++}
                id={
                  dataItemIndex.index === keyCount
                    ? "itemSelected"
                    : "itemNotSelected"
                }
              >
                <p> {value.name} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
