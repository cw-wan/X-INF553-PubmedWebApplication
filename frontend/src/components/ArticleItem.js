import React, {useEffect, useState} from 'react';
import {fetchArticleAuthors} from "../services/api";
import {Link} from "react-router-dom";
import {Segment} from 'semantic-ui-react'


const ArticleItem = ({article}) => {
    const articleId = article.article_id;
    const [authors, setAuthors] = useState([]);

    const loadAuthors = async (id) => {
        try {
            const response = await fetchArticleAuthors(id);
            setAuthors(response.data.authors);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    useEffect(() => {
        loadAuthors(articleId);
    }, [articleId]);

    return (<Segment vertical>
        <div><strong>{article.article_title}</strong></div>
        <div>
            {authors.map((author, index) => (<span key={index}>
            <Link to={`/author/${author.author_id}`}>{author.author_name + ", "}</Link>
        </span>))}
        </div>
        <div><span>{article.journal_title}, {article.year}, </span><a href={article.pubmed_link}>Pubmed</a></div>
        {article.grant_val && (<div>
            Grant info: {article.grant_val}
        </div>)}
        {article.coi_text && (<div>
            Conflict of interest: {article.coi_text}
        </div>)}
    </Segment>);
};

export default ArticleItem;