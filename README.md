# React News App

A Vite-powered React application for aggregating news from various sources.

## Repository

This project is hosted on GitHub:

[https://github.com/kumard3/react-news](https://github.com/kumard3/react-news)

## Prerequisites

- Docker installed on your machine
- Node.js and pnpm (for local development)

## Environment Variables

The application uses the following environment variables:

- `VITE_NYT_API_KEY`: API key for New York Times
- `VITE_NEWS_API_KEY`: API key for News API
- `VITE_NEWS_DATA_API_KEY`: API key for News Data API

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/kumard3/react-news.git
   cd react-news
   ```

2. Create a `.env` file in the root directory of the project with your API keys:
   ```
   VITE_NYT_API_KEY=your_nyt_api_key
   VITE_NEWS_API_KEY=your_news_api_key
   VITE_NEWS_DATA_API_KEY=your_news_data_api_key
   ```

   Replace `your_*_api_key` with your actual API keys.

## Building the Docker Image

To build the Docker image, run the following command in the repository root:

```bash
docker build \
  --build-arg VITE_NYT_API_KEY=$(grep VITE_NYT_API_KEY .env | cut -d '=' -f2) \
  --build-arg VITE_NEWS_API_KEY=$(grep VITE_NEWS_API_KEY .env | cut -d '=' -f2) \
  --build-arg VITE_NEWS_DATA_API_KEY=$(grep VITE_NEWS_DATA_API_KEY .env | cut -d '=' -f2) \
  -t react-news-app .
```

This command reads the environment variables from your `.env` file and passes them as build arguments to Docker.

## Running the Docker Container

After building the image, you can run it with:

```bash
docker run -p 3000:80 vite-news-app
```

This command starts the container and maps port 3000 of the container to port 3000 on your host machine.

## Accessing the Application

Once the container is running, you can access the application by opening a web browser and navigating to:

```
http://localhost:3000
```

## Development

For local development without Docker:

1. Install dependencies:
   ```
   pnpm install
   ```

2. Run the development server:
   ```
   pnpm run dev
   ```



## Notes

- The `.env` file contains sensitive information and should not be committed to the repository. It's included in `.gitignore` by default.
- If you need to change environment variables without rebuilding the image, consider using runtime environment injection methods provided by your deployment platform.



If you're encountering persistent problems, please open an issue in the GitHub repository.