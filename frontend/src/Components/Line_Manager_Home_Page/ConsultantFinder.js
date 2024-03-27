import { useState } from "react"
import { Link } from "react-router-dom";

//bunch of placeholder names
const consultantPlaceholderNames = [
    "John Doe",
    "Jane Doe",
    "Alice Smith",
    "Bob Johnson",
    "Emma Brown",
    "Michael Davis",
    "Sarah Wilson",
    "David Taylor",
    "Emily Martinez",
    "Chris Anderson",
    "Walter White"
  ];
//a

function ConsultantFinder() {
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);
    
        // Filter the search results based on the search text
        const filteredResults = consultantPlaceholderNames.filter(result =>
          result.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredResults);
        console.log(searchResults)
      };

    return(
        <div id="search">
            <input type="search"
            value={search}
            onChange={handleSearchChange}></input>
            <p>My Consultants</p>
            <ul>
                {search === '' ? (
                    consultantPlaceholderNames.map((result, index) => (
                    <li><Link key={index}>{result}</Link></li> 
                ))
                ) : (
                    searchResults.map((result, index) => (
                    <li><Link key={index}>{result}</Link></li> 
                )))}
            </ul>
        </div>
    )
}

export default ConsultantFinder