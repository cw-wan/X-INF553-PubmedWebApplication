import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchJournalDetails} from '../services/api';
import AuthorList from "../components/AuthorList";
import {Container,Header} from 'semantic-ui-react'

const JournalPage = () => {
    const {journalName} = useParams();
    const [authors, setAuthors] = useState([]);

    const loadAuthors = async (journal) => {
        try {
            const response = await fetchJournalDetails(journal);
            setAuthors(response.data.authors);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    useEffect(() => {
        loadAuthors(journalName);
    }, [journalName]);

    return (<Container style={{ paddingBottom: 20, paddingTop: 40 }}>
        <Header as='h1'>Journal: {journalName}</Header>
        <Container>
            <AuthorList authors={authors}/>
        </Container>
    </Container>);
};

export default JournalPage;
