using { galactic as g } from '../db/schema';
using { User } from '@sap/cds/common';

service GalacticService @(requires:'admin', path:'/galactic-list') {
  entity Spacefarers as projection on g.Spacefarers {
      key ID,
      name,
      originPlanet,
      stardustCollection,
      wormholeNavigation,
      spacesuitColor,
      position,
      department
  };
  entity Positions as projection on g.Positions;
  entity IntergalacticDepartments as projection on g.IntergalacticDepartments;
  entity SpacefarerSecurity as projection on g.SpacefarerSecurity;
}
