const users = [
    { username: "gamzekarakurt", password: "gamze1" },
    { username: "aslisener", password: "asli1" },
    { username: "sevvalkeles", password: "sevval1" }
];

let loggedInUser = null;
let onlineUsers = [];
const messages = [];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        loggedInUser = user;
        onlineUsers.push(user.username);
        errorMessage.textContent = "";
        updateUI();
    } else {
        errorMessage.textContent = "Invalid username or password";
    }
}

function updateUI() {
    if (loggedInUser) {
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("chat-container").classList.remove("hidden");
        document.getElementById("user-name").textContent = loggedInUser.username;
        updateOnlineUsers();
        updateMessages();
    }
}



function updateOnlineUsers() {
    const onlineUsersList = document.getElementById("online-users");
    onlineUsersList.innerHTML = "";
    onlineUsers.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user;
        onlineUsersList.appendChild(li);
    });
}

function updateMessages() {
    const messagesContainer = document.getElementById("messages");
    messagesContainer.innerHTML = "";
    messages.forEach(msg => {
        const p = document.createElement("p");
        p.textContent = msg;
        messagesContainer.appendChild(p);
    });
}

function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = `${loggedInUser.username}: ${messageInput.value}`;
    messages.push(message);
    messageInput.value = "";
    updateMessages();
}

function logout() {
    onlineUsers = onlineUsers.filter(user => user !== loggedInUser.username);
    loggedInUser = null;
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("chat-container").classList.add("hidden");
}

function startGame() {
    window.location.href = "game.html";
}


function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    document.getElementById("snow").appendChild(snowflake);

    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.width = Math.random() * 10 + 5 + "px";
    snowflake.style.height = snowflake.style.width;

    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snowflake.style.opacity = Math.random();

    setTimeout(() => {
        snowflake.remove();
    }, (Math.random() * 3000) + 2000);
}

setInterval(createSnowflake, 100);
