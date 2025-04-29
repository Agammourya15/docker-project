pipeline {
  agent any

  environment {
    IMAGE_NAME = "reactapp"
    DOCKER_HUB_USER = "agammourya"
    RANDOM_PORT = "8081"
    CONTAINER_NAME = "${IMAGE_NAME}-${BUILD_NUMBER}"
  }

  stages {
    stage('Clone Repo') {
      steps {
        retry(2) {
          bat 'git config --global http.sslVerify false'
          git branch: 'main', url: 'https://github.com/Agammourya15/dockerproject22.git'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        bat '''
          set DOCKER_BUILDKIT=1
          docker build -t %IMAGE_NAME% .
        '''
      }
    }

    stage('Stop Previous Container') {
      steps {
        bat '''
          docker stop %CONTAINER_NAME% || exit 0
          docker rm %CONTAINER_NAME% || exit 0
        '''
      }
    }

    stage('Run Docker Container') {
      steps {
        bat '''
          docker run -d -p %RANDOM_PORT%:80 --name %CONTAINER_NAME% %IMAGE_NAME%
        '''
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhubcred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          bat '''
            echo %PASS% | docker login -u %USER% --password-stdin
            docker tag %IMAGE_NAME% %DOCKER_HUB_USER%/%IMAGE_NAME%:latest
            docker push %DOCKER_HUB_USER%/%IMAGE_NAME%:latest
          '''
        }
      }
    }
  }

  post {
    always {
      bat '''
        docker logout
        docker system prune -f --volumes
      '''
    }
  }
}
