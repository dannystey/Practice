const mapCenterLatitude = 0;
const mapCenterLongitude = 0;

// Convert latitude and longitude to x and y positions on the map
  // export function latLngToXY(latitude: number, longitude: number, width: number, height: number): {x: number, y: number} {
  //   const x = (longitude - mapCenterLongitude) * (width / 360);
  //   const y = (Math.log(Math.tan((Math.PI / 4) + (latitude * Math.PI / 360))) - Math.log(Math.tan((Math.PI / 4) + (mapCenterLatitude * Math.PI / 360)))) * (height / (2 * Math.PI));
  //   return { x, y };
  // }

export function latLngToXY(latitude: number, longitude: number, width: number, height: number): {x: number, y: number} {
  // get x   
  var x = (longitude + 180) * (width / 360);
  // convert from degrees to radians
  var latRad = latitude * Math.PI / 180;
  // get y value
  var mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
  var y = (height / 1.66) - (width * mercN / (2 * Math.PI));
  return { x, y };
}