pipeline {
  agent any

  environment {
    IMAGE_NAME = "reactapp"
    DOCKER_HUB_USER = "agammourya"
    RANDOM_PORT = "8081"  // Random port chosen to avoid conflicts
  }

  stages {
    stage('Clone Repo') {
      steps {
        sh 'git config --global http.sslVerify false'
        git branch: 'main', url: 'https://github.com/Agammourya15/dockerproject22.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          export DOCKER_BUILDKIT=1
          docker build -t $IMAGE_NAME .
        '''
      }
    }

    stage('Stop Previous Container') {
      steps {
        sh '''
          docker stop $IMAGE_NAME || true
          docker rm $IMAGE_NAME || true
        '''
      }
    }

    stage('Run Docker Container') {
      steps {
        sh '''
          docker run -d -p $RANDOM_PORT:80 --name $IMAGE_NAME $IMAGE_NAME
        '''
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh '''
            echo "$PASS" | docker login -u "$USER" --password-stdin
            docker tag $IMAGE_NAME $DOCKER_HUB_USER/$IMAGE_NAME:latest
            docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest
          '''
        }
      }
    }
  }

  post {
    success {
      mail to: 'your_email@gmail.com',
           subject: "✅ Jenkins Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' Succeeded",
           body: "Good news!\n\nThe Jenkins build '${env.JOB_NAME} [${env.BUILD_NUMBER}]' completed successfully.\n\nCheck the build here: ${env.BUILD_URL}"
    }

    failure {
      mail to: 'your_email@gmail.com',
           subject: "❌ Jenkins Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' Failed",
           body: "Oops!\n\nThe Jenkins build '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.\n\nCheck the build here: ${env.BUILD_URL}"
    }
  }
}
