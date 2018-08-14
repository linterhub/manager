import { managerType } from './../../src/index';

interface Library {
    name: string;
    version?: string | string[];
    manager: managerType;
}

export default Library;
