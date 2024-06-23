import { Statement } from 'delib-npm';
import React from 'react';

interface GroupProps {
    statement:Statement;
}

const Group: React.FC<GroupProps> = ({statement }) => {
    return (
        <div>
            <h2>{statement.statement}</h2>
            <ul>
                <li>Doc...</li>
               
            </ul>
        </div>
    );
};

export default Group;