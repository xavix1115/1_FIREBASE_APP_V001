

jQuery('#world-map-markers').vectorMap(
{
    map: 'world_mill_en',
    backgroundColor: 'transparent',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    zoomOnScroll: false,
    color: '#d7e6ff',
    regionStyle : {
        initial : {
          fill : '#d7e6ff'
        }
      },
    markerStyle: {
      initial: {
                    r: 5,
                    'fill': '#4886ff',
                    'fill-opacity':1,
                    'stroke': '#000',
                    'stroke-width' : 2,
                    'stroke-opacity': 0
                },
                },
    enableZoom: true,
    hoverColor: '#d7e6ff',
    markers : [{
        latLng : [37.0902, 95.7129],
        name : 'USA', 
      }
	 
	  
	  ],
	  
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: [],
    showTooltip: true,
    onRegionClick: function(element, code, region)
    {
        var message = 'You clicked "'
            + region
            + '" which has the code: '
            + code.toUpperCase();

        alert(message);
    }
});
 

        $('#usa').vectorMap({
            map : 'us_aea_en',
            backgroundColor : 'transparent',
            zoomOnScroll: false,
            regionStyle : {
                initial : {
                    fill : '#d7e6ff'
                }
            }
        });
        
       
        
  