import { useEffect, useState } from "react";

import GithubMark from "../assets/github_logo.png";
import Cookies from "js-cookie";
import "./Homepage.scss";

let client_id = "66e07c977ca0164c8fa6";
let scopes = "read:user read:org repo"

function Welcome() {
  let [username, setUsername] = useState(undefined);
  async function getUsername(code) {
    // TODO: We need to make a request to the API endpoint that we just wrote.
    console.log("Success!");
    setUsername(response.username);
  }
  // This runs once when the page first loads.
  // If nobody is logged in, it attempts to start the login process.
  useEffect(()=>{
    if (username === undefined) {
      getUsername();
    }
  });

  // This is the sign-in button.
  if (Cookies.get("token") === undefined || Cookies.get("token") === "undefined") {
	  return ( <a id="github-sign-in" href={ `https://github.com/login/oauth/authorize?scope=${scopes}&client_id=${client_id}` }>
      <span>Sign in with GitHub</span>
      <img src={ GithubMark } alt="Github Logo" /> </a>
    );
  } else {
	  return (
      <span id="welcome" > Welcome
        {(username !== undefined) ? "," : ""}
        {(username !== undefined) ? <b>{username}</b> : <></>}.
      </span>
    );
  }
}

function Homepage() {
  async function login(code) {
    let request = await fetch(
      "http://localhost:4000/login",
      /* TODO: What should the body of this request be? */
    ).catch((error) => {
      console.error(error);
    });
    let response = await request.json()
    // If the response indicates that we successfully logged in,
    // reload the page to apply the changes.
    if (response.logged) {
      window.location.reload(false);
    }
  }
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams((new URL(url)).search);
    /* TODO: what do we do here? */
  });
    
  return (
    <div className="App">
      <div id="headlines">
        <Welcome />
      </div>
    </div>
  );
}

export default Homepage;
