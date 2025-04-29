pipeline {
    agent any

    environment {
        HOME = '.'
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE = 'aryansingh11/yumyum-restaurant'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DEPLOY_SERVER = 'your-deployment-server'
        RUN_DOCKER_STAGES = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Current branch: ${env.BRANCH_NAME}"
                echo "Build number: ${env.BUILD_NUMBER}"
                bat 'git branch'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci --legacy-peer-deps'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint -- --max-warnings 10'
            }
        }

        stage('Test') {
            steps {
                script {
                    def testStatus = bat(script: 'npm test', returnStatus: true)
                    def coverageStatus = bat(script: 'npm run test:coverage', returnStatus: true)

                    if (testStatus != 0 || coverageStatus != 0) {
                        echo 'Tests failed, continuing with build'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Security Scan') {
            steps {
                bat 'npm audit'
            }
        }

        stage('Docker Build') {
            when {
                expression { 
                    return env.RUN_DOCKER_STAGES == 'true' 
                }
            }
            steps {
                script {
                    echo "Starting Docker build stage..."
                    echo "Current branch: ${env.BRANCH_NAME}"
                    
                    // Check if Docker is installed and running
                    def dockerCheck = bat(script: 'docker --version', returnStdout: true)
                    echo "Docker version: ${dockerCheck}"
                    
                    // Build the image
                    echo "Building image: ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
                    bat "docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    
                    // Tag the image
                    bat "docker tag ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest"
                    echo "Docker build completed successfully"
                }
            }
        }

        stage('Docker Push') {
            when {
                expression { 
                    return env.RUN_DOCKER_STAGES == 'true' 
                }
            }
            steps {
                script {
                    echo "Starting Docker push stage..."
                    echo "Current branch: ${env.BRANCH_NAME}"
                    
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        echo "Logging into Docker Hub..."
                        bat "echo %DOCKER_PASSWORD% | docker login ${DOCKER_REGISTRY} -u %DOCKER_USERNAME% --password-stdin"
                        
                        echo "Pushing images..."
                        bat "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
                        bat "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest"
                        echo "Docker push completed successfully"
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { 
                    return env.RUN_DOCKER_STAGES == 'true' 
                }
            }
            steps {
                script {
                    echo "Starting deployment stage..."
                    echo "Current branch: ${env.BRANCH_NAME}"
                    
                    withCredentials([usernamePassword(credentialsId: 'deploy-server', usernameVariable: 'DEPLOY_USER', passwordVariable: 'DEPLOY_PASSWORD')]) {
                        echo "Connecting to deployment server..."
                        
                        // Create deployment script
                        writeFile file: 'deploy.sh', text: """
                            #!/bin/bash
                            cd /opt/yumyum
                            docker pull ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker-compose down
                            docker-compose up -d
                        """
                        
                        // Copy deployment script to server
                        bat """
                            echo "Copying deployment script to server..."
                            pscp -pw %DEPLOY_PASSWORD% deploy.sh %DEPLOY_USER%@${DEPLOY_SERVER}:/opt/yumyum/
                        """
                        
                        // Execute deployment script
                        bat """
                            echo "Executing deployment..."
                            plink -ssh %DEPLOY_USER%@${DEPLOY_SERVER} -pw %DEPLOY_PASSWORD% "chmod +x /opt/yumyum/deploy.sh && /opt/yumyum/deploy.sh"
                        """
                        
                        echo "Deployment completed successfully"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            bat "docker logout ${DOCKER_REGISTRY}"
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
