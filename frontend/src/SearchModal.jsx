/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Note from "./Note";
import "./Modal.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchModal = ({ notes, setContent, setTitle, setTime, setTags }) => {
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
    setSearchInput("");
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const term = searchInput.trim();
      setSearchTerm(term);

      if (term !== "") {
        const results = notes.filter((note) => {
          const time = note.timeCreated.toString().toLowerCase();
          const tags = note.tags || []; // Check if tags is defined, otherwise use an empty array
          return (
            note.noteTitle.toLowerCase().includes(term.toLowerCase()) ||
            tags.join("").toLowerCase().includes(term.toLowerCase()) ||
            time.includes(term.toLowerCase())
          );
        });

        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [modal]);

  return (
    <>
      <button className="btn-modal" onClick={toggleModal}>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <span className="button-text">Search</span>
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Search Notes</h2>
            <input
              className="search-box"
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
              placeholder="Search"
            />
            <div className="notes-container">
              {searchResults.length > 0 ? (
                searchResults.map((note) => (
                  <Note
                    noteTitle={note.noteTitle}
                    tags={note.tags}
                    time={note.timeCreated}
                    noteContent={note.noteContent}
                    key={note.noteID}
                    setContent={setContent}
                    setTitle={setTitle}
                    setTime={setTime}
                    setTags={setTags}
                  />
                ))
              ) : (
                <p>No matching notes found</p>
              )}
            </div>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
