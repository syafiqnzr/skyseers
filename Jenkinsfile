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

        stage('Deploy to Web Folder') {
            steps {
                echo "Copying files to /home/ubuntu/skyseers..."
                sh '''
                sudo rm -rf /home/ubuntu/skyseers/*
                sudo cp -r * /home/ubuntu/skyseers/
                sudo chown -R www-data:www-data /home/ubuntu/skyseers/
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}
