sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'spacefarers/spacefarersfiori/test/integration/FirstJourney',
		'spacefarers/spacefarersfiori/test/integration/pages/SpacefarersList',
		'spacefarers/spacefarersfiori/test/integration/pages/SpacefarersObjectPage'
    ],
    function(JourneyRunner, opaJourney, SpacefarersList, SpacefarersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('spacefarers/spacefarersfiori') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSpacefarersList: SpacefarersList,
					onTheSpacefarersObjectPage: SpacefarersObjectPage
                }
            },
            opaJourney.run
        );
    }
);