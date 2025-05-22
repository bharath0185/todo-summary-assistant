Todo Summary Assistant
A full-stack application that allows users to manage to-do items, generate a summary of pending tasks using Cohere's LLM, and send the summary to a Slack channel. This project fulfills the requirements of the Full Stack Internship Assignment.
Features

Create, view, and delete to-do items via a React-based UI.
Generate a concise summary of pending to-dos using Cohere's LLM API.
Send the summary to a specified Slack channel using Incoming Webhooks.
Display success or failure messages for Slack operations.
Store to-do items in a Supabase PostgreSQL database.

Tech Stack

Frontend: React, Axios, CSS
Backend: Node.js (Express)
Database: Supabase (PostgreSQL)
LLM: Cohere API (free-tier)
Slack: Incoming Webhooks
Deployment: Vercel (frontend), Render (backend)

Project Structure
todo-summary-assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js
│   │   │   ├── TodoList.js
│   │   │   ├── SummaryButton.js
│   │   ├── App.js
│   │   ├── App.css
│   ├── package.json
│   ├── .env.example
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── todos.js
│   │   ├── services/
│   │   │   ├── supabase.js
│   │   │   ├── cohere.js
│   │   │   ├── slack.js
│   │   ├── index.js
│   ├── package.json
│   ├── .env.example
├── README.md
├── .gitignore

Prerequisites

Node.js (v16 or later) and npm
Git
Accounts for:
Supabase (free-tier)
Cohere (free-tier API key)
Slack (for Incoming Webhooks)


Optional: Vercel and Render accounts for deployment

Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant

2. Backend Setup

Navigate to the backend directory:cd backend


Install dependencies:npm install


Copy the .env.example file to .env:cp .env.example .env


Update .env with the following:SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
COHERE_API_KEY=your-cohere-api-key
SLACK_WEBHOOK_URL=your-slack-webhook-url
PORT=5000


Set up the Supabase database:
Create a new project in Supabase.
In the Supabase SQL Editor, run:CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Copy the Project URL and Anon Public Key from Settings > API into .env.


Start the backend:npm start



3. Frontend Setup

Navigate to the frontend directory:cd ../frontend


Install dependencies:npm install


Copy the .env.example file to .env:cp .env.example .env


Update .env with the backend URL:REACT_APP_API_URL=http://localhost:5000


Start the frontend:npm start


Open http://localhost:3000 in your browser to view the app.

4. Slack Setup

Go to api.slack.com and create a new Slack app.
Enable Incoming Webhooks and generate a webhook URL for your desired channel.
Add the webhook URL to backend/.env as SLACK_WEBHOOK_URL.
Ensure the Slack app is added to the target channel.

5. Cohere Setup

Sign up at Cohere and obtain a free-tier API key.
Add the API key to backend/.env as COHERE_API_KEY.

Testing

Local Testing:

Backend: Test endpoints using Postman or curl:
GET http://localhost:5000/todos: List all todos.
POST http://localhost:5000/todos: Add a todo (body: {"task": "Test task"}).
DELETE http://localhost:5000/todos/1: Delete a todo by ID.
POST http://localhost:5000/summarize: Generate and send summary to Slack.


Frontend: At http://localhost:3000:
Add a to-do item using the form.
Delete a to-do item.
Click "Summarize and Send to Slack" and verify the message in Slack.




Troubleshooting:

Supabase Errors: Check table permissions and ensure SUPABASE_URL and SUPABASE_KEY are correct.
Cohere Errors: Verify the COHERE_API_KEY and monitor rate limits in the Cohere dashboard.
Slack Errors: Confirm the SLACK_WEBHOOK_URL is valid and the app is added to the channel.
CORS Issues: Ensure backend CORS allows http://localhost:3000.



Deployment (Optional)
Frontend (Vercel)

Install Vercel CLI:npm install -g vercel


In the frontend directory, deploy:vercel --prod


Set the REACT_APP_API_URL environment variable to the backend URL in Vercel’s dashboard.
Access the deployed frontend URL.

Backend (Render)

Create a Web Service on Render.
Connect the backend folder from your GitHub repository.
Set environment variables in Render’s dashboard (from backend/.env.example).
Set the start command: npm start.
Deploy and note the backend URL.
Update REACT_APP_API_URL in the frontend to the Render URL.

Deployed URLs

Frontend: [Update with your Vercel URL]
Backend: [Update with your Render URL]

Architecture Decisions

React: Chosen for its component-based architecture, enabling reusable UI components like TodoForm and TodoList.
Node.js/Express: Lightweight and flexible for building RESTful APIs with minimal overhead.
Supabase: Selected for its free-tier PostgreSQL database, easy setup, and built-in API for CRUD operations.
Cohere: Used for its free-tier LLM API, providing robust text generation for summarizing to-dos.
Slack Webhooks: Simple and effective for sending notifications without complex Slack bot integration.
Modular Services: Backend services (supabase.js, cohere.js, slack.js) are separated for maintainability and scalability.

Future Improvements

Add user authentication (e.g., Firebase or Supabase Auth).
Implement editing functionality for to-do items.
Enhance Slack message formatting with richer content (e.g., embeds).
Add pagination for large to-do lists.
Implement error handling for rate limits and network failures.

Notes

Ensure .env files are not committed to GitHub (excluded via .gitignore).
Cohere’s free-tier API has rate limits; monitor usage in the dashboard.
Test the summarize feature thoroughly, as it involves multiple external integrations.
For deployment, use free-tier services like Vercel and Render to avoid costs.

Contact
For questions or issues, please open an issue on the GitHub repository.
