function area() {
    return this.x * this.y;
  }
  
  function vol() {
    return this.x * this.y * this.z;
  }
  
  function solve(area, vol, input) {
    let result = [];
  
    let coordinates = JSON.parse(input);
  
    for (const current of coordinates) {
      let currentArea = Math.abs(area.apply(current));
      let currentVolume = Math.abs(vol.apply(current));
  
      let figure = {
        area: currentArea,
        volume: currentVolume,
      };
  
      result.push(figure);
    }
  
    return result;
  }
  
  console.log(
    solve(
      area,
      vol,
      '[{"x":"1","y":"2","z":"10"},{"x":"7","y":"7","z":"10"},{"x":"5","y":"2","z":"10"}]'
    )
  );
  