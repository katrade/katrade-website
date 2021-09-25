import MenuAccount from '../../templates/MenuAccount';

import Block from '../../components/Block';
import EditProfile from '../../components/Account/EditProfile';
import EditContact from '../../components/Account/EditContact';
import ProfilePic from '../../components/Account/ProfilePic';

const Profile = () => {
    return (
        <>
            <MenuAccount>
                <div className="container-white">
                    <div className="row">
                        <div className="col-9">
                            <EditProfile/>
                            <EditContact/>
                        </div>
                        <div className="col-3 text-center">
                            <ProfilePic/>
                        </div>
                    </div>

                </div>
            </MenuAccount>
        </>
    )
}

export default Profile;