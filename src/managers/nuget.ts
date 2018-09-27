import Dependency from '../interface/deps';
import Manager from '../interface/manager';
import Request from 'request-promise';
import Meta from '../interface/meta';

export default class extends Manager {

    protected host = 'api.nuget.org/v3';

    protected getVersionData(json : any, version?: string) : any {
        const actualVersion = version ? version : json.items[0].upper;
        return json.items[0].items.filter((item : any) => item.catalogEntry.version === actualVersion).shift();
    }

    private async requestNuget(name: string, version?: string): Promise<any> {
        const packageUrl = `https://${this.host}/registration3/${name.toLowerCase()}/index.json`;
        return JSON.parse(await Request(packageUrl));
    }

    constructor(name: string, host: string) {
        super(name);
        this.host = host ? host : this.host;
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        const json = await this.requestNuget(name, version);
        const data = this.getVersionData(json, version);
        
        return {
            name: data.catalogEntry.title,
            description: data.catalogEntry.description,
            url: data.catalogEntry.projectUrl,
            license: data.catalogEntry.licenseUrl ? data.catalogEntry.licenseUrl : null,
            version: data.catalogEntry.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestNuget(name, version);
        const data = this.getVersionData(json, version);
        const dependencies: Dependency[] = [];

        if (data.catalogEntry.dependencyGroups) {
            data.catalogEntry.dependencyGroups.map((dependencie : any) => {
                dependencies.push({
                    manager: this.name,
                    package: dependencie.targetFramework,
                });
            });
        }

        return dependencies;
    }

    async getVersions(name: string): Promise<string[]> {
        const json = await this.requestNuget(name);
        return json.items[0].items.map((item : any) => item.catalogEntry.version);
    }
}
