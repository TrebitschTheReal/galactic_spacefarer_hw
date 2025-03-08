using { galactic as g } from '../db/schema';
using { User } from '@sap/cds/common';

service GalacticService @(requires: 'authenticated-user') {

  // --------------------------
  // Primary Entities
  // --------------------------
  @requires: 'Spacefarers.Read'
  entity Spacefarers as projection on g.Spacefarers;

  @requires: 'Spacefarers.Read'
  entity Positions as projection on g.Positions;

  @requires: 'Spacefarers.Read'
  entity IntergalacticDepartments as projection on g.IntergalacticDepartments;

  @requires: 'Spacefarers.Read'
  entity SpacefarerSecurity as projection on g.SpacefarerSecurity;

  // --------------------------
  // Custom Actions: Admin Only
  // --------------------------
  @requires: 'Spacefarers.Create'
  action EnlistSpacefarer(spacefarerID: UUID) returns String;

  @requires: 'Spacefarers.Update'
  action UpdateSpacefarer(spacefarerID: UUID, stardustCollection: Integer, spacesuitColor: String) returns String;

  @requires: 'Spacefarers.Delete'
  action RemoveSpacefarer(spacefarerID: UUID) returns String;
}
