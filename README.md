# 💻 Tech Stack:
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)


# AiBot

AiBot is an AI-powered web application that allows users to ask any questions and receive related results. The application features image generation, image upload capabilities, and a sidebar displaying recent chats for easy access.

## Features

- **AI-Powered Chat:** Interact with an AI to get instant responses.
- **Image Generation and Upload:** Generate images or upload your own for enhanced interaction.
- **Chat History:** Sidebar with recent chats for quick access.
- **Dockerized Deployment:** Set up and run the application easily using Docker and Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/) installed.
- A valid `VITE_API_KEY` and `VITE_API_TOKEN` for client configuration.

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/shaheem728/AiBot.git
cd AiBot
```
### Step 2: Set Up the Environment Variables
Navigate to the client folder:

```bash
cd client
```
Create a .env file:
```
touch .env
```
Add the following environment variables to the .env file:
```
VITE_API_KEY = Google_api_key_here.
VITE_API_TOKEN =  Hugging_Face_Tokens_here.
```

Google Api key = https://aistudio.google.com/apikey

Hugging Face = https://huggingface.co/settings/tokens

Replace your_api_key_here and your_api_token_here with your actual credentials.

### Step 3: Build and Run the Application with Docker

Build and start the application using Docker Compose:
```
docker-compose up --build
```
The application will be available at http://localhost:5173 (or the port configured in your docker-compose.yml).

## Step 4: Access the Application
Open your browser and navigate to http://localhost:3000.

Start interacting with AiBot and explore its featur



