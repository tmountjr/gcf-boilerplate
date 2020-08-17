import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)

exports.questions = [
  {
    name: 'gcpFunctionName',
    type: 'input',
    message: 'GCP Function Name:'
  }
]
exports.apply = async (options) => {
  let packageJson = require('./package.json')
  packageJson.name = path.basename(options.projectDir)
  packageJson.scripts.deploy = packageJson.scripts.deploy
    .replace('<function-name>', options.templateSpecificOptions.gcpFunctionName)
  await writeFile(path.resolve(options.projectDir, 'package.json'), JSON.stringify(packageJson, null, '  '))
}