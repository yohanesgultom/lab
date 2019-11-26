module.exports = shipit => {
    require('shipit-deploy')(shipit)

    shipit.initConfig({
        default: {
            deployTo: '/home/user/lab/dist',
            repositoryUrl: 'https://github.com/yohanesgultom/lab.git',
        },
        production: {
            deployTo: '/home/user/lab',
            distDir: './dist',
            servers: 'user@server',
            build: 'npm run build',
        }
    })

    shipit.task('deploy', async () => {
        await shipit.local(shipit.config.build)
        await shipit.remote(`rm -rf ${shipit.config.deployTo}`)
        await shipit.start('copy-dist')
    })

    shipit.task('copy-dist', async () => {
        await shipit.copyToRemote(
          shipit.config.distDir,
          shipit.config.deployTo,
        )
    })
}