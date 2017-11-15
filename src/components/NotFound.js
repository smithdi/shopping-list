import React from 'react';

// No routing in application so probably overkill!
// Will display a not found if the url entered doesn't match defined routes in index.js
class NotFound extends React.Component{
    render(){
        return(
            <h2>Page Not Found!!!</h2>
        )
    }
}

export default NotFound;