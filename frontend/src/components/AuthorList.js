import React from 'react';
import {Link} from "react-router-dom";
import {List} from 'semantic-ui-react';

const AuthorList = ({authors}) => {
    return (<List>
        {authors.map((author, index) => (<List.Item key={index}>
            <Link to={`/author/${author.id}`}>{author.name}</Link>
        </List.Item>))}
    </List>);
};

export default AuthorList;