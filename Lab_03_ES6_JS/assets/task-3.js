function fetchUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true; 
            if (success) {
                resolve([{ name: "Arslan" }, { name: "Ahmed" }]);
            } else {
                reject("Error: Data failed to load.");
            }
        }, 3000);
    });
}

const task3Div = document.getElementById("task3");
task3Div.innerHTML = `<div class="loader-container"><h3>Asynchronous Data Loader</h3><p class="status">Loading data from server...</p></div>`;

fetchUsers()
    .then(users => {
        task3Div.innerHTML = `
            <div class="loader-container">
                <h3>Asynchronous Data Loader</h3>
                <p class="success">Loaded Users: ${users.map(u => u.name).join(", ")}</p>
            </div>`;
    })
    .catch(error => {
        task3Div.innerHTML = `
            <div class="loader-container">
                <h3>Asynchronous Data Loader</h3>
                <p style="color: red;">${error}</p>
            </div>`;
    });