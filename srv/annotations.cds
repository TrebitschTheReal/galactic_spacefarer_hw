using { galactic as g } from '../db/schema';

annotate g.Spacefarers with @(
    Capabilities.TopSupported: true,
    Capabilities.SkipSupported: true,
    Capabilities.QueryOptionsSupported: true
);

annotate g.Spacefarers with @odata.draft.enabled;
