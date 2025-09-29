import React, { use } from 'react';

const UserDetails2 = ({ detPromise }) => {
    const details = use(detPromise)
    // console.log(details);

    return (
        <div>
            <h4>{details.name}</h4>
            <h4>{details.website}</h4>
        </div>
    );
};

export default UserDetails2;