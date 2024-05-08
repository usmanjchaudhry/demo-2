import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileCreation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [culture, setCulture] = useState('');
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProfile = { name, email, password, experience, culture, profileImage, profileImageUrl };
    setProfile(newProfile);
    if (profileImage && !profileImageUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileImageUrl = reader.result;
        setProfileImageUrl(newProfileImageUrl);
        setProfile(prevState => ({ ...prevState, profileImageUrl: newProfileImageUrl }));
      };
      reader.readAsDataURL(profileImage);
    }
    setEditing(false);
    alert('Profile Created or Updated!');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
      setProfileImageUrl(''); // Reset image URL if no file is selected
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    if (editing) {
      // If editing, revert changes by resetting state to the current profile values
      setName(profile.name);
      setEmail(profile.email);
      setPassword(profile.password);
      setExperience(profile.experience);
      setCulture(profile.culture);
      setProfileImage(profile.profileImage);
      setProfileImageUrl(profile.profileImageUrl);
      setEditing(false); // Exit editing mode
    } else {
      // If creating a new profile, navigate back
      navigate(-1); // This navigates to the previous page
    }
  };

  if (profile && !editing) {
    return (
      <div>
        <h2>Profile Overview</h2>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Experience Level: {profile.experience}</p>
        <p>Cultural Preferences: {profile.culture}</p>
        {profileImageUrl && <img src={profileImageUrl} alt="Profile" style={{ width: '100px', height: '100px' }} />}
        <button onClick={handleEdit}>Edit Profile</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{editing ? 'Edit Your Profile' : 'Create Your Profile'}</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Experience Level:
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </label>
      <label>
        Cultural Preferences:
        <input
          type="text"
          value={culture}
          onChange={(e) => setCulture(e.target.value)}
        />
      </label>
      <label>
        Upload Profile Image:
        <input
          type="file"
          onChange={handleImageChange}
        />
      </label>
      <button type="submit">{editing ? 'Update Profile' : 'Create Profile'}</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default ProfileCreation;
