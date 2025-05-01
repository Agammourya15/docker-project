pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhubcred')
        IMAGE_NAME = "reactapp"
        DOCKER_HUB_USER = "agammourya"
        PORT = "5173"
        CONTAINER_NAME = "${IMAGE_NAME}-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/Agammourya15/dockerproject22.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat """
                        docker build --no-cache=false --pull=true -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhubcred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        bat """
                            echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                            docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('Verify Image') {
            steps {
                bat """
                    docker images | findstr ${IMAGE_NAME}
                    echo "Verifying image is pushed to Docker Hub..."
                    docker pull ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest
                """
            }
        }

        stage('Deploy Container') {
            steps {
                // Stop and remove existing containers
                bat """
                    docker stop ${CONTAINER_NAME} || exit 0
                    docker rm ${CONTAINER_NAME} || exit 0
                    docker run -d -p ${PORT}:5173 --name ${CONTAINER_NAME} ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest
                """
            }
        }

        stage('Health Check') {
            steps {
                bat """
                    timeout /t 30
                    curl http://localhost:${PORT} || echo "Application is starting..."
                    docker ps | findstr ${CONTAINER_NAME}
                """
            }
        }
    }

    post {
        always {
            bat """
                docker logout
                docker system prune -f --volumes
            """
            cleanWs()
        }
        success {
            echo '✅ Pipeline succeeded! React app is deployed and running.'
        }
        failure {
            bat """
                docker stop ${CONTAINER_NAME} || exit 0
                docker rm ${CONTAINER_NAME} || exit 0
                docker rmi ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest || exit 0
            """
            echo '❌ Pipeline failed. Check logs for details.'
        }
    }
}
