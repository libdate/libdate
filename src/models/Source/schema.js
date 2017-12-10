import _ from 'lodash';
import { SOURCES } from '../../constants/sources.const';

export default `
    enum Source { 
        ${_.values(SOURCES).join()}
    }
`