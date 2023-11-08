const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Get the data from the datastorage file
    fetch("datastorage.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            let dataList = data.split(`\r\n`);
            let matchFound = false;

            // Match the data from the file with the credentials from the form
            for (let i = 0; i < dataList.length; i++) {
                let userData = dataList[i].split(",");
                if (username == userData[0] && password === userData[1]) {
                    document.getElementById("output").innerHTML = "Velkommen!";
                    matchFound = true;
                    break;
                }
            }

            if (!matchFound) {
                document.getElementById("output").innerHTML = "Feil brukernavn eller passord.";
            }
        })
        .catch(error => {
            document.getElementById("output").innerHTML = `An error occurred: ${error}`;
        });
});
