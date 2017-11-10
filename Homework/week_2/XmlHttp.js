function loadFile() {

var xmlhttp;
var text;
xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      text = xmlhttp.responseText;
    }
  };
  xmlhttp.open("GET", "https://raw.githubusercontent.com/HN-Le/DataProcessing/master/Homework/week_2/knmi.txt", true);
  xmlhttp.send();
}
