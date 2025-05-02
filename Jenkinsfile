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
                    url: 'https://github.com/Agammourya15/dockerproject22'
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
                            docker login -u %USERNAME% -p %PASSWORD%
                            docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('Verify Image') {
            steps {
                script {
                    sh '''
                        docker images | grep reactapp
                        echo "Verifying image is pushed to Docker Hub..."
                        docker pull agammourya/reactapp:latest
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        always {
            sh '''
                docker logout || true
                docker system prune -f --volumes
            '''
            cleanWs()
        }
        success {
            echo '✅ Pipeline succeeded! React app is deployed and running.'
        }
        failure {
            sh '''
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                docker rmi ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest || true
            '''
            echo '❌ Pipeline failed. Check logs for details.'
        }
    }
}

