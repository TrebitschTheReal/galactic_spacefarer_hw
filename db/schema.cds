using {  managed, User, cuid } from '@sap/cds/common';

namespace galactic;

entity Spacefarers : cuid, managed {
  name                 : String @mandatory;
  originPlanet         : String;
  stardustCollection   : Integer;
  wormholeNavigation   : Integer;
  spacesuitColor       : String;
  position             : Association to Positions;
  department           : Association to IntergalacticDepartments;
};

entity Positions : managed {
  key ID   : Integer;
  title               : String;
  cosmicRank          : Integer;
  requiredSkill       : Integer;
  description         : String;
}

entity IntergalacticDepartments : managed {
  key ID   : Integer;
  name                : String;
  headquartersPlanet  : String;
  fleetSize          : Integer;
  description        : String;
}
