import React from 'react';
import ArticleItem from "./ArticleItem";

const ArticleList = ({articles}) => {
    return (<div>
            {articles.map((article, index) => (<div key={index}><ArticleItem article={article}/></div>))}
        </div>
    );
};

export default ArticleList;