import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:8000/api/';

export const fetchJournals = (page) => {
    return axios.get(`${apiEndpoint}journals/?page=${page}`);
};

export const fetchJournalDetails = (journalName) => {
    return axios.get(`${apiEndpoint}journal/?title=${journalName}`)
}

export const fetchAuthorDetails = (authorId) => {
    return axios.get(`${apiEndpoint}author/?id=${authorId}`)
}

export const fetchArticleAuthors = (articleId) => {
    return axios.get(`${apiEndpoint}article-authors/?id=${articleId}`)
}
