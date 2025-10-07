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

        stage('Deploy Container') {
            steps {
                echo 'Restarting container...'
                sh '''
                docker rm -f skyseers-container || true
                docker run -d --name skyseers-container -p 80:80 skyseers:latest
                '''
            }
        }
    }
}

