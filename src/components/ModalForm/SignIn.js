import React, {useEffect, useState} from 'react';
import {changeModal} from "../../redux/actions/Modal/modalAndOtherActions";
import {foundIcon} from "../../utils/fontsAwesome/Solid";
import {useDispatch} from "react-redux";
import {receiveToken, regEmail} from "../../utils/constants";
import {loginUser} from "../../redux/actions/Accounting/accountingAction";
import {Link, useHistory} from 'react-router-dom'

const SignIn = ({changeScroll, handleDirection}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailDirt, setEmailDirt] = useState(false);
    const [passwordDirt, setPasswordDirt] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Password не может быть пустым');
    const [formValid, setFormValid] = useState(false);



    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const changeEmail = e => {
        setEmail(e.target.value);
        if (!regEmail.test(e.target.value)) {
            setEmailError('Некорректный Email');
        } else {
            setEmailError('');
        }
    }

    const changePassword = e => {
        setPassword(e.target.value);
       if (e.target.value.length < 6 || e.target.value.length > 20) {
           setPasswordError('Password должен быть длиннее 6 и меньше 20 символов');
           if (!e.target.value) {
               setPasswordError('Password не может быть пустым');
           }
       } else {
           setPasswordError('')
       }
    }

    const blurHandler = e => {
        switch (e.target.name) {
            case 'email':
                setEmailDirt(true);
                break
            case 'password':
                setPasswordDirt(true)
                break
            default:
                return -1;

        }
    }

    const login = () => {
        if (email && password) {
            const token = receiveToken(email, password);
            dispatch(loginUser(token));
        }
    }

    return (
        <div>
            <div className={'form_block_in d-flex align-items-start'}>
                <div className={'w-50'}>
                    <div className={'form_content d-flex'}>
                        <div className={'block_label d-flex flex-column justify-content-around m-0'}>
                            <label>Email:</label>
                            <label>Password:</label>
                        </div>
                        <div className={'block_input'}>
                            <input
                                name={'email'}
                                onBlur={e => blurHandler(e)}
                                onChange={e => changeEmail(e)}
                                value={email}
                                type="email"
                                placeholder={'helenjohnson@gmail.com'}/>
                            <input
                                name={'password'}
                                onBlur={e => blurHandler(e)}
                                onChange={e => changePassword(e)}
                                value={password}
                                type="password"
                                placeholder={'*****************'}/>
                        </div>
                    </div>
                    <div className={'block_forget'}>
                        <span>Forget password?</span>
                    </div>
                </div>
                <div className={'d-flex flex-column justify-content-center w-50'}>
                    {(emailDirt && emailError) && <span className={'error_email_sign_in'}>{emailError}</span>}
                    {(passwordDirt && passwordError) && <span className={'error_password_sign_in'}>{passwordError}</span>}
                </div>
            </div>
            <div className={'footer_modal'}>
                <p className={'m-0'}>
                    By clicking “Submit”, you agree to us processing
                    your information in accordance with <Link to={'#'}>these terms</Link>.
                </p>
                <div className={'block_button_footer_modal'}>
                    <button className={'cancel_model'} onClick={() => {
                        changeScroll()
                        dispatch(changeModal(false))
                        history.push('/start')
                    }}>Cancel</button>
                    <button disabled={!formValid}
                        onClick={() => {
                            handleDirection()
                            login()
                    }} className={'submit_model'}><span className={'icon_found_modal'}>{foundIcon}</span> Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;