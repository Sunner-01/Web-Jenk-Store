pipeline {
    agent any
    tools { nodejs 'node24' }
    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
        skipStagesAfterUnstable()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 20, unit: 'MINUTES')
    }
    triggers { pollSCM('* * * * *') }
    environment {
        CI = 'true'
        NEXT_TELEMETRY_DISABLED = '1'
        DEPLOY_DIR = '/var/jenkins_deploy'
    }
    stages {
        stage('Código fuente') {
            steps {
                checkout scm
                sh 'git log -1 --format="%h | %an | %s"'
                sh 'node --version && npm --version'
            }
        }
        stage('Dependencias') { steps { sh 'npm ci --no-audit --no-fund' } }
        stage('Calidad y tipos') {
            steps { sh 'npm run lint && npm run typecheck' }
        }
        stage('Pruebas Jest') {
            steps { sh 'npm run test:ci' }
            post {
                always {
                    junit testResults: 'reports/junit.xml', allowEmptyResults: false
                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                }
            }
        }
        stage('Compilación Next.js') { steps { sh 'npm run build' } }
        stage('Despliegue local') {
            when { expression { env.BRANCH_NAME == null || env.BRANCH_NAME == 'main' } }
            steps {
                sh 'npm run deploy:local'
                archiveArtifacts artifacts: 'out/deployment.json', fingerprint: true
            }
        }
    }
    post {
        success { echo 'Validaciones aprobadas. Voltio Store publicada en http://localhost:3001' }
        failure { echo 'Ejecución fallida. Revisar la etapa en rojo; si falló antes del despliegue, la tienda conserva la versión anterior.' }
    }
}
