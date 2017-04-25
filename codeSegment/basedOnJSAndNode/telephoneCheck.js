function telephoneCheck(str) {
  var re=/^1? ?(\d{3}|\(\d{3}\))[ -]?\d{3}[ -]?\d{4}$/;
  return re.test(str);
}
