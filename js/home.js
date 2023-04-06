var emailBtn = document.getElementById('email-btn');
var email = atob("Y29udGFjdEBjeWJlcm5lc3Rlci5jb20="); // Decode the email address from the Base64 string in the script
emailBtn.setAttribute('href', 'mailto:' + email); // Set the href attribute value of the email button to the decoded email address
