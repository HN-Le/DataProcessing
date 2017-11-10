function loadFile() {

var xmlhttp;
var text;
xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      text = xmlhttp.responseText;
    }
  };
  xmlhttp.open("GET", "https://github.com/HN-Le/DataProcessing/blob/master/Homework/week_2/knmi.txt", true);
  xmlhttp.send();
}
