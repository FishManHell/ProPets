import React, {useState} from 'react';
import '../../../css/Main/Profile.css'
import MyProfile from "./MyProfile";
import Activities from "./Activities";

const ProfilePage = () => {
    const [changeState, setChangeState] = useState(true);

    return (
        <section className={'inform_pets_main'}>
            <p><span>Your profile.</span>Change, edit and manage your data.</p>
            <div className={'profile_button_block, button_form d-flex justify-content-between align-items-center'}>
                <button onClick={() => setChangeState(true)} className={`sing_up ${changeState ? 'active' : 'not_active'}`}>My profile</button>
                <button onClick={() => setChangeState(false)} className={`sign_in ${!changeState ? 'active' : 'not_active'}`}>Activities</button>
            </div>
            {changeState ?  <MyProfile/> : <Activities/>}
        </section>
    );
};

export default ProfilePage;