import { join } from 'path'
import { existsSync, statSync, unlinkSync, mkdirSync } from 'fs'

export function mkdirPath(pathStr: string) {
    let projectPath = join(process.cwd())
    const tempDirArray = pathStr.split('\\')
    for (let i = 0; i < tempDirArray.length; i++) {
        projectPath = projectPath + '/' + tempDirArray[i]
        if (existsSync(projectPath)) {
            const tempstats = statSync(projectPath)
            if (!tempstats.isDirectory()) {
                unlinkSync(projectPath)
                mkdirSync(projectPath)
            }
        } else {
            mkdirSync(projectPath)
        }
    }
}
