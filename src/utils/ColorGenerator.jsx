const colorGenerator = () => {
    var letters = '0123456789ABCDEF';
    var color = '#9';
    for (var i = 0; i < 5; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default colorGenerator