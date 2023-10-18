import React from 'react';

const ProfileCompleted: React.FC = () => {
    // Sample user data
    const userData = {
        photoUrl: '/path-to-user-photo.jpg',
        bio: 'I am a passionate developer interested in web technologies.',
        techSkills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
        languages: ['English', 'Hindi', 'Arabic'],
        certifications: [
            'AWS Certified Developer',
            'Microsoft Certified: Azure Administrator Associate',
        ],
    };

    // Share function (replace with your actual social media sharing logic)
    const shareProfile = () => {
        // Implement your social media sharing logic here
        // Example: Open a new window with a share link
        const shareUrl = 'https://example.com/user-profile'; // Replace with the actual profile URL
        window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
    };

    return (
        <div className="container">
            <div className="row">

                <h1>Thank You for complete your profile.</h1>
                <div className="col-3">

                    {/* <img src={userData.photoUrl} alt="User" /> */}
                    <i className="fas fa-user-circle" style={{fontSize:'40px'}}></i>
                </div>
                <div className='col-9'>
                    <p>{userData.bio}</p>

                    <div>
                        <h2>Technical Skills</h2>
                        <ul>
                            {userData.techSkills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2>Languages</h2>
                        <ul>
                            {userData.languages.map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2>Certifications</h2>
                        <ul>
                            {userData.certifications.map((certification, index) => (
                                <li key={index}>{certification}</li>
                            ))}
                        </ul>
                    </div>

                    {/* <div>
                            <h2>Share Profile</h2>
                            <button onClick={shareProfile}>Share on Twitter</button>
                          
                        </div> */}
                </div>
            </div>

        </div>

    );
};

export default ProfileCompleted;
