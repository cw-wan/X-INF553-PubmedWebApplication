import React from 'react';
import {Link} from "react-router-dom";
import {List} from 'semantic-ui-react';


const JournalList = ({journals}) => {
    return (<List>
        {journals.map((journal, index) => (<List.Item key={index}>
            <Link to={`/journal/${journal}`}>{journal}</Link>
        </List.Item>))}
    </List>)
};

export default JournalList;