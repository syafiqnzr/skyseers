pipeline {
    agent { label 'TestServer-agent' }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/syafiqnzr/skyseers.git',
                    credentialsId: '0b3977aa-1c48-445a-9139-18542de66c32'
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
        stage('Deploy') {
            steps {
                // copy repo content ke web server folder
                sh 'whoami'
                sh 'id'
                sh 'ls -ld /var/www/html'
            }
        }
    }
}
