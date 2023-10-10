import {UserCircleIcon} from "@heroicons/react/20/solid";
import {SignOut} from "../containers/SignOut";

export function UserInfo({user = {}, onSignOut}) {
    return <>
        <div className="bg-gray-100 p-4 shadow-lg rounded-lg">
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    {user.photoURL && <img
                        className="w-12 h-12 rounded-full"
                        src={user.photoURL || '/default-avatar.png'}
                        alt="User avatar"
                    />}
                    {!user.photoURL && <UserCircleIcon/>}
                </div>
                <div className="ml-4">
                    <div className="text-lg font-bold text-gray-700">{user.displayName}</div>
                    <div className="text-gray-700 text-sm">{user.email}</div>
                </div>
            </div>
            <SignOut onSignOut={onSignOut}/>

        </div>


    </>
}
