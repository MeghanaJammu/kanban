# Kanban Task Management App
A modern, real-time Kanban task management application built with React and Firebase(For auth and DB and also hosting). This project features a clean, dark-mode UI and a complete CI/CD pipeline for automated deployments to Google Cloud.

## Live Demo
The application is automatically deployed to Firebase Hosting via the Jenkins pipeline:

https://kanbanauth.web.app/

## Key Features
Real-time Firestore Backend: Instantly see updates across all users.

Drag & Drop Functionality: Easily move tasks between lists and reorder them.

Multiple Board Management: Create and manage separate boards for different projects.

Firebase Authentication: Secure user login and registration.

Detailed Task View: Click on any task to view and edit its details in a modal.

Fully Automated CI/CD Pipeline: Code pushed to the master branch is automatically built and deployed.

# Technology Stack
## DevOps & CI/CD Pipeline
This project is configured with a complete Continuous Integration and Continuous Deployment (CI/CD) pipeline to automate deployments.

The workflow is as follows:

A developer pushes new code to the master branch on GitHub.

A GitHub webhook automatically triggers a new build on a Jenkins server.

The Jenkins server is hosted on a Google Cloud Platform (GCP) Compute Engine virtual machine.

Jenkins executes the pipeline defined in the Jenkinsfile:

Checks out the latest source code.

Installs all Node.js dependencies (npm install).

Creates an optimized production build (npm run build).

Deploys the static build artifacts to Firebase Hosting.

This setup ensures that the latest stable version of the application is always live without any manual intervention.

## Screenshots

### DevOps and all related final images

GCP cloud VM instance

<img width="1919" height="535" alt="Screenshot 2025-09-23 125911" src="https://github.com/user-attachments/assets/fce4a47b-587d-4e14-873c-c72575dbd71d" />


Firebase hosting


<img width="1870" height="838" alt="Screenshot 2025-09-23 125120" src="https://github.com/user-attachments/assets/a3126b42-52c7-4f3a-bf19-654d35b325e1" />


Jenkins console


<img width="1919" height="990" alt="Screenshot 2025-09-23 125949" src="https://github.com/user-attachments/assets/a5243886-fb43-4357-b2be-1e3f124966a9" />


<img width="1919" height="990" alt="Screenshot 2025-09-23 125937" src="https://github.com/user-attachments/assets/3c72a1f3-a17e-4cd8-98a9-ac0184691279" />


### APP UI AND FLOW

Login & Registration
<img width="1902" height="908" alt="Screenshot 2025-07-23 215227" src="https://github.com/user-attachments/assets/4a44bb6e-53bf-4cb9-9712-105d67d480fc" />

Project Boards Dashboard
<img width="1891" height="908" alt="Screenshot 2025-07-23 215014" src="https://github.com/user-attachments/assets/3bbbfa11-1731-4367-9fce-65a7ef63e89b" />

Individual Kanban Board
<img width="1906" height="930" alt="Screenshot 2025-07-23 214927" src="https://github.com/user-attachments/assets/b6960ced-e39d-47d3-ae11-aa34dd121bfb" />

Getting Started (Local Development)
To run this project on your local machine, follow these steps:

Clone the Repository

Bash

git clone https://github.com/MeghanaJammu/kanban.git
Navigate to the Project Directory

Bash

cd kanban
Install Dependencies

Bash

npm install
Run the Development Server

Bash

npm run dev
The application will be available at http://localhost:5173.
