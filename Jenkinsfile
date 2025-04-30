pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    options {
        timeout(time: 10, unit: 'MINUTES')
        timestamps()
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                bat 'npm ci --legacy-peer-deps'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running test suite...'
                bat 'npx vitest'
            }
        }

        stage('Build Project') {
            steps {
                echo '🏗️ Building the project...'
                bat 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo '🗂️ Archiving build artifacts...'
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Build succeeded.'
        }
        failure {
            echo '❌ Build failed.'
        }
        always {
            echo '📦 Pipeline execution completed.'
        }
    }
}
