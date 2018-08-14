import Library from '../interface/library';
import { managerType } from '../../src/index';

const data : Library[] = [
    {
        name: "eslint",
        version: "5.3.0",
        manager: managerType.npm
    },
    {
        name: 'bandit',
        version: '1.4.0',
        manager: managerType.pip
    },
    {
        name: 'squizlabs/php_codesniffer',
        version: '3.3.1',
        manager: managerType.composer
    },
    {
        name: 'brakeman',
        version: '4.3.1',
        manager: managerType.gem
    }
];

export default data;
