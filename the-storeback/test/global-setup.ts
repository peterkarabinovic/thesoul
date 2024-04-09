import * as path from "node:path"
import { v2 as compose } from 'docker-compose'

const cwd = path.join(__dirname, '..')

export async function mochaGlobalSetup() {
    await compose.upAll({ cwd });
    
}

export async function mochaGlobalTeardown() {
}