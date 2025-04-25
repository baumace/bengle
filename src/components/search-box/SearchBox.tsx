import { useCallback, useEffect, useState } from "react";
import "./SearchBox.css";
import { Player } from "../Player";

const STARTING_INDEX = -1;
const EMPTY_STRING = "";

enum Key {
  ENTER = "Enter",
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
};

interface SearchBoxProps {
  placeholder: string;
  data: Player[];
  disabled: boolean;
  selectPlayer: (value: Player) => void;
}

function SearchBox({ placeholder, data, disabled, selectPlayer }: SearchBoxProps) {
  const [autofillOptions, setAutofillOptions] = useState<Player[]>([]);
  const [autofillOptionIndex, setAutofillOptionIndex] = useState(STARTING_INDEX);
  const [searchInput, setSearchInput] = useState(EMPTY_STRING);

  // search input changes
  useEffect(() => {
    let filteredAutofillOptions: Player[] = [];
    setAutofillOptionIndex(STARTING_INDEX);
    if (searchInput !== EMPTY_STRING) {
      filteredAutofillOptions = data.filter((value) => value.name.toLowerCase().includes(searchInput.toLowerCase()));
    }
    setAutofillOptions(filteredAutofillOptions);
  }, [searchInput, data])

  const handlePlayerSelection = useCallback(
    (value: Player) => {
      selectPlayer(value);

      // reset to initial state
      setAutofillOptions(autofillOptions.slice(0, 0));
      setSearchInput(EMPTY_STRING);
      setAutofillOptionIndex(STARTING_INDEX);
    },
    [selectPlayer, autofillOptions]
  );

  const handleKeyboard = useCallback((event: KeyboardEvent) => {
    if (autofillOptions.length > 0) {
      if (event.key === Key.ENTER && autofillOptionIndex !== STARTING_INDEX) {
        handlePlayerSelection(autofillOptions[autofillOptionIndex]);
      } else if (event.key === Key.ARROW_DOWN) {
        event.preventDefault();

        // handle edge case to loop back to search text
        if (autofillOptionIndex === autofillOptions.length - 1) {
          setAutofillOptionIndex(STARTING_INDEX);
        } else {
          setAutofillOptionIndex((autofillOptionIndex + 1) % autofillOptions.length);
        }
      } else if (event.key === Key.ARROW_UP) {
        event.preventDefault();

        // handle edge case to loop from search text to last option and loop back to search text
        if (autofillOptionIndex === STARTING_INDEX) {
          setAutofillOptionIndex(autofillOptions.length - 1);
        } else if (autofillOptionIndex === STARTING_INDEX + 1) {
          setAutofillOptionIndex(STARTING_INDEX);
        } else {
          setAutofillOptionIndex((autofillOptionIndex - 1) % autofillOptions.length);
        }
      }
    }
  }, [autofillOptions, autofillOptionIndex, handlePlayerSelection]);

  // Add the event listener for the keyboard
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="searchBox">
      <div className="searchInput">
        <input
          type="text"
          className="searchInputText"
          id={autofillOptions.length !== 0 ? "active" : "inactive"}
          value={autofillOptionIndex === STARTING_INDEX ? searchInput : autofillOptions[autofillOptionIndex].name}
          placeholder={placeholder}
          onChange={(event) => setSearchInput(event.target.value)}
          disabled={disabled}
        />
      </div>
      {autofillOptions.length > 0 && (
        <div className="searchResult">
          {autofillOptions.map((player, index) => {
            return (
              <div
                className="dataItem"
                onClick={() => handlePlayerSelection(player)}
                key={index}
                id={autofillOptionIndex === index ? "itemSelected" : "itemNotSelected"}
              >
                <p>{player.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
