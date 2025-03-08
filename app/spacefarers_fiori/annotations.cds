using GalacticService as service from '../../srv/galactic-service';

annotate service.Spacefarers with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type  : 'UI.DataField',
                Label  : 'Spacefarer ID',
                Value  : ID,
            },
            {
                $Type  : 'UI.DataField',
                Label  : 'Name',
                Value  : name,
            },
            {
                $Type  : 'UI.DataField',
                Label  : 'Origin Planet',
                Value  : originPlanet,
            },
            {
                $Type  : 'UI.DataField',
                Label  : 'Stardust Collection',
                Value  : stardustCollection,
            },
            {
                $Type  : 'UI.DataField',
                Label  : 'Wormhole Navigation',
                Value  : wormholeNavigation,
            },
            {
                $Type  : 'UI.DataField',
                Label  : 'Spacesuit Color',
                Value  : spacesuitColor,
            },
            {
                $Type  : 'UI.DataField',
                Label  : 'Position ID',
                Value  : position_ID,
            },
            {
                $Type  : 'UI.DataField',
                Label  : 'Department ID',
                Value  : department_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'GeneratedFacet1',
            Label  : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Spacefarer ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Stardust Collection Status',
            Value : stardustCollection,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Spacesuit Color',
            Value : spacesuitColor,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Position Title',
            Value : position.title
        },
    ],
);

// Value list for position
annotate service.Spacefarers with {
    position @Common.ValueList : {
        $Type           : 'Common.ValueListType',
        CollectionPath  : 'Positions',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : position_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'cosmicRank',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'requiredSkill',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'description',
            },
        ],
    };
};

// Value list for department
annotate service.Spacefarers with {
    department @Common.ValueList : {
        $Type           : 'Common.ValueListType',
        CollectionPath  : 'IntergalacticDepartments',
        Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : department_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'headquartersPlanet',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'fleetSize',
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'description',
            },
        ],
    };
};
