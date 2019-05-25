import React from 'react';

const BackButton = ({...props}) => {
  return <button className="BackButton" onClick={props.resetMenu}>Back</button>
}

export default BackButton;