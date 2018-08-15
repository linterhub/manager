import Library from './interface/library';
import { managerType } from './../src/index';

const data : Library[] = [
    {
        name: "eslint",
        version: "5.2.0",
        manager: managerType.npm
    },
    {
        name: 'bandit',
        version: '1.3.0',
        manager: managerType.pip
    },
    {
        name: 'squizlabs/php_codesniffer',
        version: '3.3.0',
        manager: managerType.composer
    },
    {
        name: 'brakeman',
        version: '4.3.0',
        manager: managerType.gem
    }
];

export default data;
