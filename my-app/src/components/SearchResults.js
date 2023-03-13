import React from "react"

export default function SearchBar({searchTerm, onSearchTermChange, onSearchSubmit }){
    return(
//         <div className="search">
//    <input placeholder="search for movies"/>
//    </div>
<div className="search">
<form onSubmit={onSearchSubmit}>
      <input type="text" value={searchTerm} onChange={onSearchTermChange} />
      <button type="submit" className="button">Search</button>
    </form>
</div>
    )
}