import React from 'react'
import { Link } from 'react-router-dom'


const Profileitem = (props) => {
    const { profile, numberOfNotes } = props;

    return (
        <div className="container" style={{ padding: "60px" }}>
            <div className="card text-center">
                <div className="card-header">
                    <h5>Your Profile</h5>
                </div>
                <div className="card-body">
                    <h5 className="card-title my-3">Name: {profile.name}</h5>
                    <h6 className="card-text mb-3">Email: {profile.email}</h6>
                    <Link to={"/"} className="btn btn-primary my-3">Back to Home</Link>
                </div>
                <div className="card-footer text-body-secondary">
                    Total Notes: {numberOfNotes}
                </div>
            </div>
        </div>
    )
}

export default Profileitem