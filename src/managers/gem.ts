import { Manager } from '../interface/manager';
import { Dependency } from '../interface/deps';
import { Meta } from '../interface/meta';
const requestPromise = require('request-promise');

export default class extends Manager {

    protected host = 'rubygems.org';

    protected generateUrl(method: string, gem: string){
        return `https://${this.host}/api/v1/${method}/${gem}.json`;
    }

    protected async requestGEM(name: string, version?: string): Promise<any> {
        return JSON.parse(await this.cache(requestPromise(this.generateUrl('gems', name)), `${name}:gems`));
    }

    constructor(name: string, host: string) {
        super(name);
        this.host = host;
    }

    async getMeta(name: string, version?: string): Promise<Meta> {
        const json = await this.requestGEM(name, version);
        return {
            name: json.name,
            description: json.description,
            url: json.homepage_uri,
            license: json.licenses ? json.licenses[0] : null,
            version: json.version,
        };
    }

    async getDeps(name: string, version?: string): Promise<Dependency[]> {
        const json = await this.requestGEM(name, version);
        const dependencies: Dependency[] = [];

        for (const key in json.dependencies.runtime) {
            if (json.dependencies.runtime.hasOwnProperty(key)) {
                dependencies.push({
                    manager: this.name,
                    package: json.dependencies.runtime[key].name,
                    version: json.dependencies.runtime[key].requirements
                });
            }
        }

        return dependencies;
    }

    async getVersions(name: string): Promise<string[]> {
        const data = await this.cache(requestPromise(this.generateUrl('versions', name)), `${name}:versions`);
        return JSON.parse(data);
    }
}
