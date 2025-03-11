**Gamonzy 🎰**


**Overview**

Gamonzy is an online slot machine game designed as a learning project for TypeScript. It incorporates account management, game mechanics, and AWS integration for a seamless experience. Users can create an account, manage their balance, and play a high-risk, high-reward slot machine game.


**Features**

🎮 Slot Machine Gameplay: Bet on up to 3 rows; matching symbols yield rewards.

💰 Account Management: Sign up, log in, add/remove funds, and track balance.

🌐 AWS Integration: Backend functions are deployed using AWS Lambda, API Gateway, and DynamoDB.

🖥️ Frontend UI: Built with HTML, CSS, and TypeScript, interacting with the backend via API calls.


**Project Structure**

The project is divided into Backend and Frontend.


**Backend:**

Written in TypeScript and deployed to AWS Lambda.

Uses DynamoDB for account management and API Gateway for communication.


**Key directories:**

src/ → Contains the TypeScript source code.

dist/ → Contains the compiled JavaScript files.


**Frontend**

Built using HTML, CSS, and TypeScript.

Fetches data from the backend using API calls.


**Key files:**

home.html, signup.html → UI pages.

home.ts, Main.ts, utils.ts → Logic handling frontend interaction.


**Installation**

To set up the project locally:

Clone the repository:

`  git clone https://github.com/Kn-Chandhanavarshini28/Gamonzy.git`

`  cd Gamonzy`

Navigate to the Backend and install dependencies:

`  cd Backend/my-ts-pro`

`  npm install`


Navigate to the Frontend and install dependencies:

`  cd ../../Frontend/my-ts-pro`

`  npm install`


**Learning Experience**

This project was a valuable learning journey, introducing concepts like:

TypeScript for structured development.

AWS Lambda, API Gateway, and DynamoDB for backend integration.

Full-stack development, organizing frontend and backend separately.

