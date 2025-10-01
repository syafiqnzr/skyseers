pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // ID dari Jenkins credentials
        DOCKERHUB_REPO = "syafiqnzr/skyseers" // ganti dengan Docker Hub repo kau
        APP_NAME = "skyseers-app"
    }

    stages {
        stage('Checkout from GitHub') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/syafiqnzr/skyseers.git',
                    credentialsId: 'github-credentials'  // ID GitHub credential
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKERHUB_REPO}:latest ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "docker push ${DOCKERHUB_REPO}:latest"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    // Stop container lama kalau ada
                    sh "docker rm -f ${APP_NAME} || true"
                    // Run container baru
                    sh "docker run -d --name ${APP_NAME} -p 8080:80 ${DOCKERHUB_REPO}:latest"
                }
            }
        }
    }
}
