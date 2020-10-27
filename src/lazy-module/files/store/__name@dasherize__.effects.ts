import { JobProcessEffects } from '../components/pages/job-process-page/store/job-process.effects';
import { JobProcessListEffects } from '../components/pages/job-process-list/store/job-process-list.effects';


export const jobProcessModuleEffects = [
    JobProcessListEffects,
    JobProcessEffects
];
