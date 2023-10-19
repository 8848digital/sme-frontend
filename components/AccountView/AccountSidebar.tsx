import React from "react";
import Link from "next/link";
import { useState } from "react";
const AccountSidebar = () => {
  const [index, setIndex] = useState(1);

  return (
    <div className="sidebar_wrapper">
      <div style={{ paddingTop: "200px" }}>
        <ul className="pr-5">
          <li
            className={index === 1 ? "active" : ""}
            onClick={() => setIndex(1)}
          >
            <Link href="/account-view"> Bio</Link>
          </li>
          <li
            className={index === 2 ? "active" : ""}
            onClick={() => setIndex(2)}
          >
            <Link href="/job-request"> Job Request</Link>
          </li>
          <li
            className={index === 3 ? "active" : ""}
            onClick={() => setIndex(3)}
          >
            <Link href="/contract"> Contract</Link>
          </li>
          <li
            className={index === 4 ? "active" : ""}
            onClick={() => setIndex(4)}
          >
            <Link href=""> Account</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountSidebar;
