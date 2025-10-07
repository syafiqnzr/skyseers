pipeline {
    agent any

    environment {
        IMAGE_NAME = 'skyseers:latest'
        CONTAINER_NAME = 'skyseers'
    }

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
                echo "Building Docker image..."
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying container..."
                sh '''
                # Stop container lama kalau ada
                docker ps -q --filter "name=${CONTAINER_NAME}" | grep -q . && docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME} || true

                # Jalankan container baru
                docker run -d --name ${CONTAINER_NAME} -p 80:80 ${IMAGE_NAME}
                '''
            }
        }

        stage('Deploy to Web Folder') {
             steps {
                echo "Copying files to /home/ubuntu/skyseers..."
                sh '''
                sudo rm -rf /home/ubuntu/skyseers/*
                sudo cp -r * /home/ubuntu/skyseers/
                '''
            }
        }

    }
}
