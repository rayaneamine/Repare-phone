import React, { useState } from 'react';
import "/Users/r/Desktop/sieli/repare-phone/assets/sass/formulaire.scss"
// import Cookies from 'js-cookie'; // https://www.npmjs.com/package/js-cookie
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { URL } from '../Urls';

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const loginRegex = /.{5,}/
  const navigate = useNavigate();

  const GoOn = () => {
    setTimeout(()=>{
      navigate('/choix');
    }, 100)
  }

  const BackOff = () => {
    setTimeout(()=>{
      window.location.reload();
    }, 100)
  }

  const VerifRegEx = () => {
    if (loginRegex.test(login) ) {
      // console.log("login okay");
      const message = document.querySelector("#errLogMes")
      message.style.opacity = 0;
    } else {
      // console.log("login false");
      const message = document.querySelector("#errLogMes")
      message.style.opacity = 1;
    }

    if (passwordRegex.test(password)) {
      // console.log("password okay");
      const message = document.querySelector("#errPasMes")
      message.style.opacity = 0;
    } else {
      // console.log("password false");
      const message = document.querySelector("#errPasMes")
      message.style.opacity = 1;
    }
    
    if(loginRegex.test(login) && passwordRegex.test(password)){
      VerifUser()
    }
  }

  const VerifUser = () => {
    let userId
    // post vers le back end avec login et mdp qui return l'id dans la response
    axios.post(URL.verifyUsers, {
      email: login,
      password: password,
    }).then(response =>{
      userId = response.data.id
      // console.log(response.data.id);
      if (userId === "The password is incorrect" || userId === "No user found") {
        BackOff()
      }
      Cookies.set("TokenForDNSUser", userId, { expires: 1 }); // remplacer par l'id de l'utilisateur
      setTimeout(()=>{
        GoOn();
      }, 500)
    })

    // localStorage.setItem("TokenForDNSUser", 1234567890)
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    VerifRegEx()
  }

  return (
    <section id="Login">
      <form onSubmit={handleSubmit} id="form">
        <div>
          <label htmlFor="dashLogin">Login</label>
          <input
            type="text"
            name="dashLogin"
            id="dashLogin"
            placeholder="Enter your login ..."
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
        </div>
        <div className="errorText" id='errLogMes'>Mauvais identifiant</div>
        <div>
          <label htmlFor="dashPass">Password</label>
          <input
            type="text"
            name="dashPass"
            id="dashPass"
            placeholder="Enter your password ..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="errorText" id='errPasMes'>Mauvais mot de passe (8 charactères, Minuscule, Majuscule, Chiffre et Charactère spéciaux)</div>
        <button>LOGIN</button>
      </form>
      <img src="/img/login-background.jpg" alt="background" />
    </section>
  );
};

export default Login;