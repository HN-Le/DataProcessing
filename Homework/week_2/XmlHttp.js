function loadFile() {

var xmlhttp;
var text;
xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      text = this.responseText;
    }
  };
  xmlhttp.open("GET", "knmi.txt", true);
  xmlhttp.send();
}
