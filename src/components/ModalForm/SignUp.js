import React, {useEffect, useState} from 'react';
import {changeModal} from "../../redux/actions/Modal/modalAndOtherActions";
import {foundIcon} from "../../utils/fontsAwesome/Solid";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/actions/Accounting/accountingAction";
import {Link, useHistory} from "react-router-dom";
import {correctlyPassword, regEmail} from "../../utils/constants";

const SignUp = ({changeScroll, handleDirection}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const [nameDirt, seNameDirt] = useState(false);
    const [emailDirt, setEmailDirt] = useState(false);
    const [passwordDirt, setPasswordDirt] = useState(false);
    const [nameError, setNameError] = useState('Name не может быть пустым');
    const [emailError, setEmailError] = useState('Email не может быть пустым');
    const [passwordError, setPasswordError] = useState('Password не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (nameError || emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, emailError, passwordError]);

    const changeName = e => {
        setName(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setNameError('Name должно быть не длинее 3 символов и меньше 20 символов');
            if (!e.target.value) {
                setNameError('Name не может быть пустым');
            }
        } else {
            setNameError('');
        }
    }

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
        if (e.target.value.length < 8) {
            setPasswordError(correctlyPassword);
            if (!e.target.value) {
                setPasswordError('Password не может быть пустым');
            }
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = e => {
        switch (e.target.name) {
            case 'name':
                seNameDirt(true);
                break
            case 'email':
                setEmailDirt(true);
                break
            case 'password':
                setPasswordDirt(true);
                break
            default:
                return -1
        }
    }

    const receiveInform = () => {
        if (name && email && password && repeatedPassword) {
            if (password === repeatedPassword) {
                const user = {name, email, password};
                dispatch(registerUser(user));
            } else {
                alert('password dont match')
            }
        } else {
            alert('Fill in all the fields')
        }
    }

    return (
        <div>
            <div className={'form_block_up'}>
                <div className={'form_content d-flex w-50'}>
                    <div className={'block_label d-flex flex-column justify-content-around m-0'}>
                        <label>Name:</label>
                        <label>Email:</label>
                        <label>Password:</label>
                        <label>Password:</label>
                    </div>
                    <div className={'block_input'}>
                        <input
                            onBlur={e => blurHandler(e)}
                            onChange={e => changeName(e)}
                            name={'name'}
                            type="text"
                            placeholder={'Helen Johnson'}
                            value={name}
                        />
                        <input
                            onBlur={e => blurHandler(e)}
                            onChange={e => changeEmail(e)}
                            name={'email'}
                            type="email"
                            placeholder={'helenjohnson@gmail.com'}
                            value={email}/>
                        <input
                            onBlur={e => blurHandler(e)}
                            onChange={e => changePassword(e)}
                            name={'password'}
                            type="password"
                            placeholder={'*****************'}
                            value={password}/>
                        <input
                            onChange={e => setRepeatedPassword(e.target.value)}
                            type="password"
                            placeholder={'*****************'}
                            value={repeatedPassword}/>
                    </div>
                </div>
                <div className={'inform_form w-50'}>
                    {(nameDirt && nameError) && <span className={'error_name_sign_up'}>{nameError}</span>}
                    {(emailDirt && emailError) && <span className={'error_email_sign_up'}>{emailError}</span>}
                    {(passwordDirt && passwordError) && <p className={'error_password_sign_up m-0'}>{passwordError}</p>}
                    {password === repeatedPassword ? null : <p className={'error_re_password_sign_up m-0'}>Please re-enter your password</p>}
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
                    <button
                        disabled={!formValid}
                        className={'submit_model'}
                        onClick={() =>  {
                            handleDirection()
                            receiveInform()
                    }}><span className={'icon_found_modal'}>{foundIcon}</span> Submit</button>
                </div>
            </div>
        </div>

    );
};

export default SignUp;