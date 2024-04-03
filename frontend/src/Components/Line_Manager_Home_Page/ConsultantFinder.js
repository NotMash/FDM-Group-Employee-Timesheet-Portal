import { useState, useEffect } from "react"
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

//localhost:5000/list_consultants

function ConsultantFinder() {
    const [foundConsultants, setFoundConsultants] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    var foundConsultantNamesArray = []

    useEffect(() => {
        const fetchData = async () =>{
            try{
                await fetch('http://127.0.0.1:5000/list_consultants', {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                        credentials: 'include',
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        } 
                        else {
                            throw new Error('Fetching Consultant Failed with Status: ' + response.status);
                        }
                    }).then(data => {
                        // Data fetched successfully
                        console.log(data)
                        setFoundConsultants(data);
                    }).catch(error => {
                        console.error(error);
                    });
            } catch(error) {
                console.log("error fetching data")
            }
        };
        fetchData();
    }, []);

    if(foundConsultants === null) {
        return(
            <p>Loading data</p>
        )
    }
    console.log("stored stuff:",foundConsultantNamesArray)

    Object.entries(foundConsultants).map(entry => {
        foundConsultantNamesArray.push(entry[0])
    })

    const handleSearchChange = (e) => {
        const searchText = e.target.value;
        setSearch(searchText);
    
        // Filter the search results based on the search text
        const filteredResults = foundConsultantNamesArray.filter(result =>
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
                        foundConsultantNamesArray.map((result, index) => (
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