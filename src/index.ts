import { Manager } from './interface/manager';

export enum managerType {
    npm = "npm",
    pip = "pip",
    gem = "gem",
    composer = "composer"
}


export function getManager(manager: managerType | String): Manager | undefined {
    const managerName: string | undefined =
        manager instanceof (String) ?
            ((Object as any).values(managerType).includes(manager.toString()) ? manager.toString() : undefined) :
            managerType[manager];
    if (managerName){
        const managerClass = require(`./managers/${managerName}`);
        return new managerClass.default(managerName);
    } else {
        return undefined;
    }
}