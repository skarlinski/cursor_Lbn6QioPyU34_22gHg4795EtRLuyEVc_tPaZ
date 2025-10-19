# Python Server

This is a Flask-based API server for managing custom HTTP status cats.

## Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the server with:
```bash
python server.py
```

The server will run on `http://localhost:3001`

## API Endpoints

### POST /api/statuses
Upload a custom status cat image.
- Form data:
  - `status`: HTTP status code (string)
  - `image`: Image file (multipart/form-data)
- Returns: 201 Created with status information

### GET /api/statuses
Get a list of all custom status codes.
- Returns: JSON array of status codes

### GET /api/images/:status
Get the image for a specific status code.
- Returns: Image file with appropriate content type

## Previous Implementation

The previous Node.js/Express implementation can be found in:
- `index.js` - Express server setup
- `routes.js` - API routes
- `package.json` - Node.js dependencies
