pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/syafiqnzr/skyseers.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("skyseers:latest")
                }
            }
        }
        stage('Run Container') {
            steps {
                script {
                    docker.run("skyseers:latest", "-p 8081:80")
                }
            }
        }
    }
}
