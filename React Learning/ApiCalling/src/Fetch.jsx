import { use } from "react";

const Fetch = ({ fetchUser }) => {

    const users = use(fetchUser)
    // console.log(users);

    return (
        <div>
            <h3>Users : {users.length}</h3>

            {
                users.map(user => <UserInfo key={user.id} user={user}></UserInfo>)
            }
        </div>
    );
};

const UserInfo = ({ user }) => {

    console.log(user);
    const { name, email } = user

    return (
        <div className="card">
            <div>
                <h3>Name: {name}</h3>
                <p>Email: {email}</p>
            </div>
        </div>
    )
}

export default Fetch;