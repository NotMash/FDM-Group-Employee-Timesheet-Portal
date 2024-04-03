import { useState } from "react"
import styles from './ConsultantFinder.module.css';
import ConsultantCard from "./ConsultantCard";

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
        <div className={styles.pageContainer}>
            <div className={styles.searchContainer}>
                <h2 className={styles.searchTitle}>Search Consultant</h2>
                <input type="search"
                value={search}
                onChange={handleSearchChange}
                className={styles.searchBox}></input>
            </div>

            <div className={styles.searchResultsContainer}>
                <p className={styles.myConsultantsTitle}>My Consultants</p>
                <div className={styles.searchResults}>
                    {search === '' ? (
                        consultantPlaceholderNames.map((result, index) => (
                        <ConsultantCard name={result} key={index}></ConsultantCard>
                    ))
                    ) : (
                        searchResults.map((result, index) => (
                        <ConsultantCard name={result} key={index}></ConsultantCard>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default ConsultantFinder