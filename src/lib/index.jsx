import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = 'https://res.cloudinary.com/back-road-code/image/upload';

var $S = require('scriptjs');

class SimpleGoogleMaps extends Component {
  constructor(props){
    super(props);

    this.state = {
      mapLoaded: false
    };
  }

  componentDidMount(){
    window.google ? this.setState({
      mapLoaded:true
    }) :
    $S(`https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}`, () => {
      this.setState({
        mapLoaded:true
      });
    });
  }

  render(){
    if(this.state.mapLoaded){
      var map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: this.props.zoom,
        center: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
        }
      });
      if(this.props.markers){
        if(Array.isArray(this.props.markers)){
          for(let i of this.props.markers){

            let clickContent = `<div>
                <p><a href='/adventures/${i.id}'>${i.label}</a></p>
                <p>Duration: ${i.min_dur} minutes</p>
                <i>${i.cat}</i>
            </div>`;

            let clickInfowindow = new google.maps.InfoWindow({
              content: clickContent
            });

            switch (i.cat) {
              case "Hiking":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/hiking_jvtm0j.png`;
                break;
              case "Wildlife":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/wildlife_w2l8vn.png`;
                break;
              case "Hunting":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/hunting_mkjgzm.png`;
                break;
              case "Biking":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/biking_cy9brs.png`;
                break;
              case "Off-Roading":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/off-roading_h8duqq.png`;
                break;
              case "Boating":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/boating_samm5m.png`;
                break;
              case "Watersports":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/watersports_oqvkxe.png`;
                break;
              case "Winter":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/winter_xqzimp.png`;
                break;
              case "Fishing":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/fishing_ztbaof.png`;
                break;
              case "Wildlife":
                var image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/wildlife_w2l8vn.png`;
                break;
            }

            new google.maps.Marker({
              position: i,
              map: map,
              icon: image
            });

            google.maps.event.addListener(marker,'click', (function(marker,clickContent,clickInfowindow){ 
              return function() {
                  clickInfowindow.setContent(clickContent);
                  clickInfowindow.open(map,marker);
              };
            })(marker,clickContent,clickInfowindow));

          }
        }else{
          new google.maps.Marker({
            position: this.props.markers,
            map: map,
          });
        }
      }
    }
    return (
      <div id='map' style={this.props.style}></div>
    );
  }
}

export default SimpleGoogleMaps;

SimpleGoogleMaps.propTypes = {
  zoom: PropTypes.number.isRequired,
  apiKey: PropTypes.string.isRequired,
  center: PropTypes.objectOf(PropTypes.number.isRequired),
  style: PropTypes.object.isRequired,
  markers: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.object)
  ])
}
