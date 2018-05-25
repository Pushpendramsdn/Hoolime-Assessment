import React from 'react';
const authorRecentWorks = (props) => {
    let recentWorkList="";

    if(props.recentworks){
    recentWorkList = props.recentworks.map(recentWork => {
        return  <li>{recentWork.title}</li>
    });
    }

    return <ul>{recentWorkList}</ul>
    
}

export default authorRecentWorks;