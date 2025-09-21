pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/MeghanaJammu/kanban.git'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to Firebase') {
            steps {
                withCredentials([string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')]) {
                    sh 'firebase deploy --only hosting --token $FIREBASE_TOKEN'
                }
            }
        }
    }
}

