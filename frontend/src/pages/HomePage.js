import React, {useState, useEffect} from 'react';
import {fetchJournals} from '../services/api';
import JournalList from '../components/JournalList';
import NavigationButton from '../components/NavigationButton';
import {Container, Header} from 'semantic-ui-react'

const HomePage = () => {
    const [journals, setJournals] = useState([]);
    const [pagination, setPagination] = useState({});

    const loadJournals = async (page) => {
        try {
            const response = await fetchJournals(page);
            setJournals(response.data.journals);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching journals:', error);
        }
    };

    useEffect(() => {
        loadJournals(1); // Load the first page initially
    }, []);


    return (<Container style={{ paddingBottom: 20, paddingTop: 40 }}>
        <Header as='h1'>Home</Header>
        <JournalList journals={journals}/>
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {pagination.previous && (
                <NavigationButton text="Previous" onClick={() => loadJournals(pagination.previous)}/>)}
            {pagination.next && (<NavigationButton text="Next" onClick={() => loadJournals(pagination.next)}/>)}
        </Container>
    </Container>);
};

export default HomePage;
