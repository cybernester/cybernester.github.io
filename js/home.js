var emailBtn = document.getElementById('email-btn');
var email = atob("Y29udGFjdEBjeWJlcm5lc3Rlci5jb20=");
emailBtn.setAttribute('href', 'mailto:' + email);

var callBtn = document.getElementById('call-btn');
var call = atob("KzQ0Nzk1MDk5OTc4Nw==");
callBtn.setAttribute('href', 'tel:' + call);