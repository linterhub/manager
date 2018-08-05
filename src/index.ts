import { Manager } from './interface/manager';

export enum managerType {
    npm = "npm",
    pip = "pip",
    gem = "gem",
    composer = "composer"

}


export function getManager(manager: managerType | String): Manager {
    const managerName: string =
        manager instanceof (String) ?
            manager.toString() :
            managerType[manager];
    const managerClass = require(`./managers/${managerName}`);
    return new managerClass.default(managerName);
}