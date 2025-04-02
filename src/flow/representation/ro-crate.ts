import {ROCrate} from "ro-crate"

const crate = new ROCrate();

const license = {
    '@id': 'https://creativecommons.org/licenses/by/4.0/',
    '@type': 'CreativeWork',
    'description': 'Attribution 4.0 International (CC BY 4.0) ...',
    'name': 'CC BY 4.0'
};

const rootDataset = {
    name: 'Tutorial Crate',
    description: 'This is an example crate for educational purposes.',
    datePublished: new Date().toISOString().split('T')[0],
    license: {'@id': license['@id']}
};

crate.addEntity(rootDataset);
crate.addEntity(license);

export const crate_json = crate.toJSON();
