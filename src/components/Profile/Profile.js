import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { FaCheckCircle, FaFax, FaMailBulk, FaUserEdit, FaVoicemail } from 'react-icons/fa'


const Profile = () => {
    const { user, userEmail } = useContext(UserContext)
    return (
        <div className='blogs' style={
            {
                backgroundColor: '#fff',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between'
            }
        }>
            <p style={{ color: 'black' }}>
                <span style={{ fontWeight: 'bold' }}>

                    Hello !!
                </span>
                <span style={
                    {
                        color: 'black',
                        margin: '10px 0',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }>
                    <p style={{ display: 'flex', justifyContent: '', alignItems: 'center' }}>{user}
                        <FaCheckCircle style={{
                            color: 'green',
                            margin: '0 4px'
                        }} />
                    </p>
                    <p>
                        {userEmail}
                        <FaMailBulk style={{ marginLeft: '4px', color: 'purple' }} />
                    </p>
                </span>
            </p>
            <p style={{
                height: '80px'
                , padding: '5px',
                backgroundColor: '#EEE',
                userSelect: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}>
                <FaUserEdit />
                Update Your Profile
            </p>
        </div>
    )
}

export default Profile
