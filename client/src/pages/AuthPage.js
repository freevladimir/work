import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"
import '../css/register.css'


export const AuthPage = () =>{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        name: '', email: '', password: '', wallet: '', friendId: ''
    })

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
            await loginHandler()
        } catch (e) {}
    }

    const loginHandler = async () =>{
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
            console.log(history.push('/allgames'))
            auth.login(data.token, data.userId)
            history.push('/allgames')
            console.log('Data', data)

        } catch (e) {}
    }



    return (
        <div className="row register">
            <video id="videoBG" autoPlay muted loop>
                <source src={require("../img/background.mp4")} type="video/mp4"/>
            </video>

            <header className="header" id="header">
                <div className="container">

                    <img className="logo-mob" src={require("../img/img1.png")} alt="logo-mobile"/>
                        <div className="content">
                            <img className="logo2" src={require("../img/logo.png")} alt="logo"/>
                                <form action="#">
                                    <div className="input-container">
                                        <i className="fa fa-user icon1"></i>
                                        <input className="input-field" type="text" placeholder="Name" name="name" onChange={changeHandler}/>
                                    </div>

                                    <div className="input-container">
                                        <i className="fa fa-user icon1"></i>
                                        <input className="input-field" type="text" placeholder="Email" name="email" onChange={changeHandler}/>
                                    </div>

                                    <div className="input-container">
                                        <i className="fa fa-key icon1"></i>
                                        <input className="input-field" type="password" placeholder="Password"
                                               name="password" onChange={changeHandler}/>
                                    </div>

                                    <div className="input-container">
                                        <i className="fa fa-key icon1"></i>
                                        <input className="input-field" type="password" placeholder="Password"
                                               name="macthPassword" onChange={changeHandler}/>
                                    </div>

                                    <div className="input-container">
                                        <i className="fa fa-user icon1"></i>
                                        <input className="input-field" type="text" placeholder="My wallet" name="wallet" onChange={changeHandler}/>
                                    </div>

                                    <div className="input-container">
                                        <i className="fa fa-user icon1"></i>
                                        <input className="input-field" type="text" placeholder="Friend ID or wallet"
                                               name="friendId" onChange={changeHandler}/>
                                    </div>

                                    <button type="submit" className="btn" onClick={registerHandler} disabled={loading}>Sign in</button>
                                    <div className="register">
                                        <a href="#" className="forget">
                                            Forget Password
                                        </a>
                                    </div>
                                </form>
                        </div>
                </div>
            </header>
        </div>
    )
}