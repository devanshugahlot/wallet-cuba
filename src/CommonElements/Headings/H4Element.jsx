import React from 'react';

const H4 = (props) =>{
    return <h4 style={{color:'#000'}} {...props.attrH4}>{props.children}</h4>;
};

export default H4;