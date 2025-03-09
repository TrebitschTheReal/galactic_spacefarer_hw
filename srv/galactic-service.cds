using { galactic as g } from '../db/schema';
using { User } from '@sap/cds/common';

service GalacticService {

  // --------------------------
  // Primary Entities
  // --------------------------
  @odata.draft.enabled: true
  entity Spacefarers as projection on g.Spacefarers {
      key ID,
      @readonly name,
      @readonly originPlanet,
      stardustCollection,
      @readonly wormholeNavigation,
      spacesuitColor,
      @readonly position,
      @readonly department
  };
  entity Positions as projection on g.Positions;
  entity IntergalacticDepartments as projection on g.IntergalacticDepartments;
  entity SpacefarerSecurity as projection on g.SpacefarerSecurity;

  // --------------------------
  // Custom Actions: Admin Only
  // --------------------------
  action EnlistSpacefarer(spacefarerID: Integer) returns String;
  action UpdateSpacefarer(spacefarerID: Integer, stardustCollection: Integer, spacesuitColor: String) returns String;
  action RemoveSpacefarer(spacefarerID: Integer) returns String;
}
