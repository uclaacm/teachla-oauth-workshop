express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const axios = require("axios");

const port = 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

let { clientID, clientSecret } = require("./githubsso.json");

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.post("/login", function (req, res) {
    // Error handling for if the token isn't set correctly or if the user is already logged in.
    if (req.cookies.token && req.cookies.token != "undefined") {
        console.log(req.cookies.token);
        console.log("Token already exists!");
        res.send({
            logged: false,
        });
        return;
    }
    let code = req.body.authcode;
    axios({
        /* TODO: What request should we make here? */
        // method: "POST",
        // url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
        // headers: {
        //     Accept: "application/json",
        // },
    }).then((response) => {
        // Here, we store the returned access token as a cookie.
        // This allows us to send the access token alongside the rest of the request.
        res.cookie("token", response.data.access_token, { maxAge: 3600000 });
        console.log("set cookie: " + response.data.access_token);
        if (response.data.access_token === "undefined" || response.data.access_token === undefined) {
            res.send({
                logged: false,
                status: 200,
            });
        }
        else {
            res.send({
                logged: true,
                status: 200,
            });
        }
    });
});

// Get username from GitHub API token
app.get("/get-username", function (req, res) {
    // Handle the case of the token not being present
    if (!Object.prototype.hasOwnProperty.call(req.cookies, "token") || req.cookies["token"] === "undefined") {
        res.send(JSON.stringify({username: "Guest"}));		
    }
    // Otherwise,
    else {
        /* TODO: What request should we make here? */
        axios({
            // method: "GET",
            // url: `https://api.github.com/user`,
            // headers: {
            //     Authorization: "token " + req.cookies.token,
            // },
        }).then((response) => {
            /* TODO: What should we do with the response? */
            // res.send(JSON.stringify({username: response.data.login}));
        });
    }
});