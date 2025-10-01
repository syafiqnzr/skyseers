pipeline {
  agent none
  environment {
    APP = "Skyseers"
    DOCKER_REPO = "syafiqnzr/${APP}"
  }
  stages {
    stage('Checkout') {
      agent { label 'dev' }
      steps {
        checkout scm
      }
    }

    stage('Build & Push Image') {
      agent { label 'dev' }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
          sh "docker build -t ${DOCKER_REPO}:${BUILD_NUMBER} ."
          sh "docker push ${DOCKER_REPO}:${BUILD_NUMBER}"
        }
      }
    }

    stage('Deploy to Production') {
      agent { label 'prod' }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
        }
        sh """
          docker pull ${DOCKER_REPO}:${BUILD_NUMBER}
          docker stop ${APP} || true
          docker rm ${APP} || true
          docker run -d --name ${APP} -p 80:80 --restart unless-stopped ${DOCKER_REPO}:${BUILD_NUMBER}
        """
      }
    }
  }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh 'docker tag mywebsite:latest mydockerhubuser/mywebsite:latest'
                    sh 'docker push mydockerhubuser/mywebsite:latest'
                }
            }
        }

  post {
    always {
      echo "Build finished: ${currentBuild.currentResult}"
    }
  }
}
