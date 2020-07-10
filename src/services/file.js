const readFileAsString = (path) => {
  var reader = new FileReader();
  reader.onload = function (event) {
    console.log('File content:', event.target.result);
  };
  reader.readAsText(files[0]);
};
