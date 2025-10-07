pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Untuk repo private, gunakan credentialsId yang dah ditambah di Jenkins
                git branch: 'master', 
                    credentialsId: 'syafiq-token', // Ganti dengan ID credential awak
                    url: 'https://github.com/syafiqnzr/skyseers.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("skyseers:latest")
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop & remove container lama jika ada
                    sh '''
                    docker rm -f skyseers-container || true
                    docker run -d --name skyseers-container -p 8081:80 skyseers:latest
                    '''
                }
            }
        }
    }
}
