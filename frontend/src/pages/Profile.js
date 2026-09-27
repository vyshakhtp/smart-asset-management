import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { fetchProfile,updateProfile } from '../store/ProfileSlice';
import './Profile.css';

function Profile() {

    const profile = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const [username, setUsername] = useState(profile.username);
    const [email, setEmail] = useState(profile.email);
    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);
    useEffect(() => {
        setUsername(profile.username);
        setEmail(profile.email);
    }, [profile.username, profile.email]);

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async() => {
        try{
            await dispatch(updateProfile({
            username : username,
            email : email
        })).unwrap();
        setIsEditing(false);
        }catch (error) {
        console.error("Profile update failed:", error);
    }
        
    };

    return (
        <div className="profile">
            <div className="profile-header">
                <h1>Profile</h1>
                <p>View and manage your profile information</p>
            </div>
            <div className="profile-card">
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Username
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                value={username}
                                readOnly={!isEditing}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Email
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="email"
                                value={email}
                                readOnly={!isEditing}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}>
                            Role
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                value={ profile.role }
                                readOnly
                            />
                        </Col>
                    </Form.Group>

                    <div className="profile-button">

                        {!isEditing ? (
                            <Button
                                variant="primary"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </Button>
                        ) : (
                            <Button
                                variant="success"
                                onClick={handleSave}
                            >
                                Save Changes
                            </Button>
                        )}

                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Profile;