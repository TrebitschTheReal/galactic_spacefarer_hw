namespace galactic;

using { cuid, managed, User } from '@sap/cds/common';

// ------------------------------
// Galactic Spacefarers Entity
// ------------------------------
entity Spacefarers : cuid, managed {
  name                 : String(111);        // Űrutazó neve
  originPlanet         : String(111);        // Származási bolygó neve
  stardustCollection   : Integer;            // Gyűjtött csillagpor mennyisége
  wormholeNavigation   : Integer;            // Féregjárat navigációs képesség (1-100)
  spacesuitColor       : String(50);         // Űrruha színe

  // Intergalaktikus kapcsolatok
  position             : Association to Positions;  // Pozíció az intergalaktikus szervezetben
  department           : Association to IntergalacticDepartments; // Űrkutató osztály
}

// ------------------------------
// Galactic Positions Entity
// ------------------------------
entity Positions : cuid, managed {
  title               : String(100);         // Pozíció neve (Pl.: Fleet Commander)
  cosmicRank          : Integer;             // Rang (1-10)
  requiredSkill       : Integer;             // Szükséges navigációs képesség (1-100)
  description         : String(255);         // Pozíció leírása
}

// ------------------------------
// Intergalactic Departments Entity
// ------------------------------
entity IntergalacticDepartments : cuid, managed {
  name                : String(100);         // Osztály neve (Pl.: Galactic Research)
  headquartersPlanet  : String(100);         // Központi bolygó neve
  fleetSize          : Integer;              // Flotta mérete
  description        : String(255);          // Osztály rövid leírása
}

// ------------------------------
// Cosmic Security Entity
// ------------------------------
entity SpacefarerSecurity : cuid, managed {
  spacefarer          : Association to Spacefarers;  // Űrutazó referencia
  restrictedPlanets   : String(500); // Az a bolygólista, amelyhez nincs hozzáférése
  accessLevel         : Integer;      // Hozzáférési szint (1 = Alap, 5 = VIP)
}
