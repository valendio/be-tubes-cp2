node('jenkins-agent-nodejs-1') {
 status = "0"

 try{
     
   stage('Cleaning Workspace') {
       echo 'Initializing for clean build...'
       deleteDir()
   }
   
   stage('Initialize') {
       echo 'Initializing...'
       def node = tool name: 'NodeJS-8.9', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
       env.PATH = "${node}/bin:${env.PATH}"
   }

   stage('Checkout SCM') {
       echo 'Checkout SCM...'
       checkout scm
   }
 
   try{

       stage('Check Env') {
           echo 'Checking Environment...'
           sh 'node -v'
           sh 'npm -v'
       }
       stage('Build') {
           echo 'Building Dependency...'
           sh 'npm install'
       }
       
       stage('Testing'){
           echo 'Testing...'
           sh 'npm test --exit'
           status = "1"
       }
   }finally{
       stage('Code Coverage'){
           sh 'npm run junit'
           sh 'npm run coverage --exit'
           junit 'test-results.xml'
       }
       stage('SonarQube analysis') {
           def scannerHome = tool 'SonarQube Scanner';
           withSonarQubeEnv('SonarQube') {
             sh "${scannerHome}/bin/sonar-scanner"
           }
       }
   
 }

 }catch(e){

   throw e;
 }
 
  if(status == "1"){
      echo "hasil: ${status}"
      echo "Test Berhasil"
      stage('Build In Openshift'){
        echo 'Build In Openshift...'
          openshiftBuild(namespace: 'nakama-core-api', buildConfig: 'nakama-core-api', showBuildLogs: 'true')
      }  
  }else{
      echo "Test Gagal"
  }
 
}
