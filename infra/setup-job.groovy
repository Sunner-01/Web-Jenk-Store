import jenkins.model.Jenkins
import org.jenkinsci.plugins.workflow.job.WorkflowJob
import org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition
import hudson.plugins.git.GitSCM
import hudson.plugins.git.UserRemoteConfig
import hudson.plugins.git.BranchSpec

// Instalación local autorizada. Copiar a jenkins_home/init.groovy.d/voltio-store.groovy
// y reiniciar Jenkins después de publicar main. No toca usuarios ni seguridad.
def instance = Jenkins.get()
if (instance.getItem('voltio-store') == null) {
    def job = instance.createProject(WorkflowJob, 'voltio-store')
    def scm = new GitSCM(
        [new UserRemoteConfig('https://github.com/Sunner-01/Web-Jenk-Store.git', null, null, null)],
        [new BranchSpec('*/main')], false, [], null, null, []
    )
    def definition = new CpsScmFlowDefinition(scm, 'Jenkinsfile')
    definition.setLightweight(true)
    job.setDefinition(definition)
    job.setDescription('Voltio Store: pruebas y despliegue local desde main. Poll SCM cada minuto después del primer build.')
    job.save()
    job.scheduleBuild2(15)
    println('Voltio Store: trabajo creado y primera ejecución programada.')
} else {
    println('Voltio Store: el trabajo ya existe; se conserva su configuración.')
}
