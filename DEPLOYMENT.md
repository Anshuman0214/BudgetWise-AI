# Deployment Guide

## Backend

1. Provision MongoDB Atlas.
2. Set environment variables from `backend/.env.example`.
3. Build and deploy the backend Docker image to Render, Fly.io, AWS ECS, Azure Container Apps, or Kubernetes.
4. Configure health checks at `/health`.
5. Configure the public API URL in the frontend as `VITE_API_URL`.

## Frontend

1. Run `npm run build -w frontend`.
2. Deploy `frontend/dist` to Vercel, Netlify, S3 + CloudFront, or nginx.
3. Set `VITE_API_URL` to the deployed backend `/api/v1` base URL.

## CI/CD

The included GitHub Actions pipeline installs dependencies, lints, tests, and builds both apps. Add deployment jobs after secrets are configured:

- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLIENT_URL`
- Cloud provider registry credentials
