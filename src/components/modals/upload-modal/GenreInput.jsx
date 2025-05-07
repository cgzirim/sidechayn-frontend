import React, { forwardRef, useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import useGenres from "../../../api/hooks/genre/useGenres";

const GenreInput = forwardRef(({ onChange, name }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const debouncedSearch = debounce((val) => {
    setSearchTerm(val);
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
    setShowDropdown(true);
  };

  const { data, isLoading } = useGenres(searchTerm);

  const handleSelect = (genre) => {
    // setInputValue(genre.name);
    setInputValue(genre.id); // set input value to genre ID
    onChange({ target: { name, value: genre.name } }); // update form value
    setShowDropdown(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-white" ref={dropdownRef}>
      <label htmlFor="genre" className="block text-sm font-medium mb-1">
        Genre
      </label>
      <input
        type="text"
        id="genre"
        name={name}
        ref={ref}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        placeholder="Select genre"
        className="w-full px-3 py-2 border border-gray-600 bg-[#151515] text-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
        autoComplete="off"
      />
      {showDropdown && data?.results?.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md bg-[#1e1e1e] text-sm shadow-lg ring-1 ring-black ring-opacity-5">
          {data.results.map((genre) => (
            <li
              key={genre.id}
              onClick={() => handleSelect(genre)}
              className="cursor-pointer px-4 py-2 hover:bg-[#2c2c2c]"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && !isLoading && data?.results?.length === 0 && (
        <div className="absolute mt-1 w-full rounded-md bg-[#1e1e1e] px-4 py-2 text-sm text-gray-400">
          No genres found
        </div>
      )}
    </div>
  );
});

export default GenreInput;
