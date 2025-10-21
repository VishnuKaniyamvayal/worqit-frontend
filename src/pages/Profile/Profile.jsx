import ProfileCard from "./components/ProfileCard/ProfileCard"
import ProfileTabs from "./components/Tabs/ProfileTabs"

const Profile = () => {
  return (
    <div>
      {/* User Basic Card + Edit Details Button + button click opens drawer form */}
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-4 sm:col-span-1">
          <ProfileCard />
        </div>
        <div className="col-span-4 sm:col-span-3">
          <ProfileTabs />
        </div>
        {/* RIGHT SIDE: Details like attendance in tabs */}
      </div>
      {/* Other Main stuff */}
    </div>
  )
}

export default Profile