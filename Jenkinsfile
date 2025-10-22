pipeline {
    agent { label 'TestServer-agent' }  // pilih node yang dah kau setup
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/syafiqnzr/skyseers.git'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Build running on $(hostname)"'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
            }
        }
    }
}
