# Airbnb-Clone-Wanderlust

This is a clone of the Airbnb website, built using Node.js, Express, and MongoDB.

## Features

- User Authentication (Login, Signup, Logout)
- Listing Management (Create, Edit, Delete, View Listings)
- Review System (Add, Delete Reviews)
- Flash Messages for user feedback
- Session Management

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/airbnb-clone.git
   cd airbnb-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   ATLASDB_URL='your_mongodb_connection_string'
   SECRET='your_secret_key'
   PORT=3000
   ```

4. **Initialize Database (Optional):**
   Run the init script to populate the database with sample data:
   ```bash
   node init.js
   ```

### Usage

**Start the server:**
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
airbnb-clone/
├── controllers/    # Request handlers
├── models/         # Mongoose schemas
├── routes/         # Route definitions
├── views/          # EJS templates
├── public/         # Static assets (CSS, JS)
├── utils/          # Utility functions
├── middleware/     # Custom middleware
└── app.js          # Express app entry point
```

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)
- [Passport](https://www.passportjs.org/) - Authentication
- [Connect-Mongo](https://github.com/k norman/connect-mongo) - Session storage
- [Flash](https://github.com/expressjs/flash) - Flash messages
