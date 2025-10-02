const content = document.getElementById('content');
const fetchBtn = document.getElementById('fetchBtn');
const fetchSingleBtn = document.getElementById('fetchSingleBtn');
const asyncAwaitBtn = document.getElementById('asyncAwaitBtn');
const clearBtn = document.getElementById('clearBtn');

// API endpoint - using JSONPlaceholder (free fake API for testing)
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Method 1: Using Fetch API with Promises (.then/.catch)
function fetchUsersWithPromises() {
    showLoading();

    // Fetch returns a Promise
    fetch(API_URL)
        .then(response => {
            // Check if response is successful
            if (!response.ok) {
                throw new Error(HTTP Error! Status: ${response.status});
            }
            // Parse JSON - this also returns a Promise
            return response.json();
        })
        .then(data => {
            // Handle the JSON data
            displayUsers(data);
            console.log('Fetched users:', data);
        })
        .catch(error => {
            // Error handling
            displayError(error);
            console.error('Fetch error:', error);
        })
        .finally(() => {
            // This runs regardless of success or failure
            console.log('Fetch operation completed');
        });
}

// Method 2: Using Async/Await (cleaner syntax for Promises)
async function fetchUsersWithAsync() {
    showLoading();

    try {
        // Await pauses execution until Promise resolves
        const response = await fetch(API_URL);

        // Error handling for HTTP errors
        if (!response.ok) {
            throw new Error(HTTP Error! Status: ${response.status});
        }

        // Parse JSON response
        const data = await response.json();

        // Display the data
        displayUsers(data);
        console.log('Fetched users with async/await:', data);

    } catch (error) {
        // Catch any errors
        displayError(error);
        console.error('Async fetch error:', error);
    }
}

// Method 3: Fetch single user with additional error scenarios
async function fetchSingleUser() {
    showLoading();

    try {
        const userId = Math.floor(Math.random() * 10) + 1;
        const response = await fetch(${API_URL}/${userId});

        if (!response.ok) {
            throw new Error(User not found! Status: ${response.status});
        }

        const user = await response.json();
        displayUsers([user]); // Display as array

    } catch (error) {
        displayError(error);
    }
}

// Display loading state
function showLoading() {
    content.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Fetching data from API...</p>
        </div>
    `;
}

// Display error message
function displayError(error) {
    content.innerHTML = `
        <div class="error">
            <h3>❌ Error Occurred</h3>
            <p><strong>Message:</strong> ${error.message}</p>
            <p><strong>Type:</strong> ${error.name}</p>
            <p>Please check your internet connection and try again.</p>
        </div>
    `;
}

// Display users in a grid
function displayUsers(users) {
    const stats = `
        <div class="stats">
            <div class="stat-item">
                <div class="stat-value">${users.length}</div>
                <div class="stat-label">Users Loaded</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${new Set(users.map(u => u.address.city)).size}</div>
                <div class="stat-label">Cities</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${new Set(users.map(u => u.company.name)).size}</div>
                <div class="stat-label">Companies</div>
            </div>
        </div>
    `;

    const userCards = users.map(user => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <p class="email">📧 ${user.email}</p>
            <p>📱 ${user.phone}</p>
            <p>🏙️ ${user.address.city}</p>
            <p>🌐 ${user.website}</p>
            <p class="company">🏢 ${user.company.name}</p>
        </div>
    `).join('');

    content.innerHTML = stats + <div class="users-grid">${userCards}</div>;
}

// Clear content
function clearContent() {
    content.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Click a button above to fetch user data</p>';
}

// Event listeners
fetchBtn.addEventListener('click', fetchUsersWithPromises);
asyncAwaitBtn.addEventListener('click', fetchUsersWithAsync);
fetchSingleBtn.addEventListener('click', fetchSingleUser);
clearBtn.addEventListener('click', clearContent);

// Initial state
clearContent();