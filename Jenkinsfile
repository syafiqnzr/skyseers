pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/syafiqnzr/skyseers.git',
                    credentialsId: 'syafiq-token'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t skyseers:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to /home/ubuntu/skyseers...'
                sh 'cp -r * /home/ubuntu/skyseers/'
            }
        }
    }
}

