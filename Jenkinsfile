pipeline {
  agent any

  environment {
    IMAGE_NAME = "reactapp"
    DOCKER_HUB_USER = "agammourya"
    HOST_PORT = "5173"
    CONTAINER_PORT = "5173"
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

    stage('Stop Container on Port 5173') {
      steps {
        bat '''
          docker ps -q --filter "publish=5173" > tmp.txt
          for /f %%i in (tmp.txt) do docker stop %%i & docker rm %%i
          del tmp.txt
        '''
      }
    }

    stage('Run Docker Container') {
      steps {
        bat '''
          docker run -d -p %HOST_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %IMAGE_NAME%
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
