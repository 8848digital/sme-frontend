import React from "react";
import AccountBio from "./AccountBio";
import useProfile from "@/hooks/profile_hooks/profile_hooks";
import useFetchOurBio from "@/hooks/buildYourBio/get_bio_hooks";

const AccountViewMaster = () => {
  const { bio, loading } = useFetchOurBio();

  console.log("bio Data  bio", bio);
  return (
    <div>
      <AccountBio bioData={bio} loading={loading} />
    </div>
  );
};

export default AccountViewMaster;
