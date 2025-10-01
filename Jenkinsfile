pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/syafiqnzr/skyseers.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("syafiqnzr/skyseers:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh 'docker run -d -p 8081:80 syafiqnzr/skyseers:latest'
            }
        }
    }
}
