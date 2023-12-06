import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import './register.css'
import axios from 'axios'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
    const [showPass, setshowPass] = useState(false)
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [ready, setReady] = useState(false)
    const [nameVaild, SetNameVaild] = useState(false)
    const [validPass, SetvalidPass] = useState(false)

    useEffect(() => {
        const nameOk = USER_REGEX.test(username)
        if (nameOk) {
            SetNameVaild(true)
        } else {
            SetNameVaild(false)
        }
    }, [username])

    useEffect(() => {
        const passOk = PWD_REGEX.test(pass)
        if (passOk) {
            SetvalidPass(true)
        } else {
            SetvalidPass(false)
        }
    }, [pass])

    const register = async (e) => {
        e.preventDefault()
        if (!validPass) {
            alert('Enter Valid Pass')
        } else if (!nameVaild) {
            alert('not valid name')
        } else {
            try {
                const { data } = await axios.post('http://localhost:5000/register',
                    { username, email, pass },
                    { withCredentials: true })
                if (data.data === 'found account') {
                    alert('Account Taken')
                } else {
                    setReady(true)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (ready) {
        return <Navigate to={'/login'} />
    }
    return (

        <form onSubmit={register}>
            <h1 className='text-2xl font-bold'>Resister</h1>
            <div>
                <input type="text" placeholder='Enter Name' value={username} required autoComplete="new-password" onChange={(e) => setUserName(e.target.value)} />
                <FaCheck style={!nameVaild ? { color: 'red', fontSize: '24px', padding: '2px' } : { color: 'green', fontSize: '24px', padding: '2px' }} />
            </div>
            <p className={!nameVaild & username !== '' ? 'show-error error' : 'error'}>Invalid Name Not Less Than 4 Letters with Upper And Lowercase Letters</p>
            <input type="email" placeholder='Enter Email' value={email} required autoComplete="new-password" onChange={(e) => setEmail(e.target.value)} />
            <div style={{
                position: 'relative'
            }}>
                {showPass ? <FaEyeSlash onClick={() => setshowPass(false)} style={{
                    position: 'absolute',
                    right: '10px',
                    top: '20%',
                    fontSize: '18px',
                    cursor: 'pointer'
                }} /> : <FaEye onClick={() => setshowPass(true)} style={{
                    position: 'absolute',
                    right: '10px',
                    top: '20%',
                    cursor: 'pointer',
                    fontSize: '18px'
                }} />}
                <input
                    type={showPass ? "text" : 'password'}

                    placeholder='Enter Password' value={pass} required autoComplete="new-password" onChange={(e) => setPass(e.target.value)} />
                <FaCheck style={!validPass ? { color: 'red', fontSize: '24px', padding: '2px' } : { color: 'green', fontSize: '24px', padding: '2px' }} />
            </div>
            <p className={!validPass & pass !== '' ? 'show-error error' : 'error'}>Invalid Password it should contain Upper,Lowercase,Spcial Chacacter  and Not Less Than 8 Letters</p>

            <input type="submit" value={'Submit'} />
            <p>Have an Account ??  <Link to={'/login'}> Sign in</Link></p>
        </form>
    )
}

export default Register

