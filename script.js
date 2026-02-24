const userContainer = document.getElementById("userContainer");
const statusText = document.getElementById("status");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
    try {
        statusText.textContent = "Loading users...";
        userContainer.innerHTML = "";

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const users = await response.json();

        statusText.textContent = "";

        users.forEach(user => {
            const card = document.createElement("div");
            card.classList.add("user-card");

            card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> 
                    ${user.address.street}, 
                    ${user.address.city}
                </p>
            `;

            userContainer.appendChild(card);
        });

    } catch (error) {
        statusText.textContent = "Failed to load data. Check your internet connection!!";
        console.error("Error:", error);
    }
}

// Reload button event
reloadBtn.addEventListener("click", fetchUsers);

// Load data when page opens
fetchUsers();