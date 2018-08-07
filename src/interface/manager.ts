import { Dependency } from './deps';
import { Meta } from './meta';
import { Cacheable } from './cacheable';

/**
 * This abstract class describes methods of package manager object
 */
export abstract class Manager extends Cacheable {

    protected name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * Get package meta-information
     * @param {string} name - package name
     * @param {string} version - package version, latest by default
     */
    abstract async getMeta(name: string, version?: string) : Promise<Meta>;

    /**
     * Get package dependesies
     * @param {string} name - package name
     * @param {string} version - package version, latest by default
     */
    abstract async getDeps(name: string, version?: string) : Promise<Dependency[]>;

    /**
     * Get list of package versions
     * @param {string} name - package name
     */
    abstract async getVersions(name: string) : Promise<string[]>;
}
