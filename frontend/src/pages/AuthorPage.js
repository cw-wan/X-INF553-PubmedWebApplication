import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchAuthorDetails} from '../services/api';
import ArticleList from "../components/ArticleList";
import {Container, Header} from 'semantic-ui-react'

const AuthorPage = () => {
    const {authorId} = useParams();
    const [authorName, setAuthorName] = useState("")
    const [articles, setArticles] = useState([]);

    const loadArticles = async (authorId) => {
        try {
            const response = await fetchAuthorDetails(authorId);
            setArticles(response.data.publications);
            setAuthorName(response.data.author_name)
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        loadArticles(authorId);
    }, [authorId]);

    return (<Container style={{ paddingBottom: 20, paddingTop: 40 }}>
        <Header as='h1'>Author: {authorName}</Header>
        <Container>
            <ArticleList articles={articles}/>
        </Container>
    </Container>);
};

export default AuthorPage;