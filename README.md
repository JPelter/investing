# Introduction
This repository consists of infrastructure definitions and code to create an investment analytics site with a community.

## Infrastructure
### Postgres
We use a Postgres image from the Dockerhub, so there is no need to build for this step.
The data stored in the database will consist of user accounts, metadata for user posts, and metadata for scraping job runs.
### MinIO
For object storage, we use MinIO, again a Dockerhub image. The content will consist of the data for user profiles and posts and the data collected from scraping job runs.

## Code
### Backend
To enable access to the data and interactions in the forum, we have a Python Flask API. This API enables creating a user account, logging into an account to get a session cookie, and then using that cookie to interact with authenticated endpoints (like stock analytics tools).
### Frontend
The frontend UI is built with React. It consists of a landing page which displays near real-time data, the latest posts from the forum, and links to news stories with short descriptions.