using { galactic as g } from '../db/schema';

annotate g.Spacefarers with @(
    odata.draft.enabled
);
