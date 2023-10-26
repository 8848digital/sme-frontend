import React from "react";
import AccountBio from "./AccountBio";
import useProfile from "@/hooks/profile_hooks/profile_hooks";


const AccountViewMaster = () => {
  const {profileData , loading} = useProfile();
  console.log('profile Data',profileData);
  return (
    <div>
      
      <AccountBio profileData={profileData} loading={loading}/>
    </div>
  );
};

export default AccountViewMaster;
