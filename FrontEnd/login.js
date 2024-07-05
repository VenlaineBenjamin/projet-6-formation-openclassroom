const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputButton = document.querySelector("#loginButton");
const linkLogin = document.querySelector(".btnLogin");

let msgError = document.querySelector("#error");
console.log(inputEmail);
console.log(inputPassword);
console.log(inputButton);
console.log(msgError);
console.log(linkLogin);

inputButton.addEventListener("click", (event) => {
    event.preventDefault();
    const body = {
        email: inputEmail.value,
        password: inputPassword.value,
    };
    msgError.innerHTML = "";
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then(async (response) => {
        console.log(response);
        if (response.status === 200) {
            const { token } = await response.json();
            // mettre le token dans le localStorage
            window.localStorage.setItem("token", token);
            console.log(response.ok);
            // rediriger vers l'acceille
            location.href = "/";
        } else {
            msgError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
        }
        console.log(response);
    });
});
