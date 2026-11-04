pipeline {
    options { timestamps() }
    agent none
    stages {
        stage('Check scm') {
            agent any
            steps {
                checkout scm
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '-u root'
                }
            }
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '-u root'
                }
            }
            environment {
                JEST_JUNIT_OUTPUT_DIR = 'test-reports'
            }
            steps {
                sh 'npm ci'
                sh 'npx jest --ci --reporters=default --reporters=jest-junit'
            }
            post {
                always {
                    junit 'test-reports/*.xml'
                }
                success {
                    echo "Application testing successfully completed"
                }
                failure {
                    echo "Oooppss!!! Tests failed!"
                }
            }
        }
        stage('Image building') {
            agent any
            steps {
                script {
                    dockerImage = docker.build("lytvynchuk_illia/lab4-app:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-creds') {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
}