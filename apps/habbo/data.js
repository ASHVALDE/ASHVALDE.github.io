function isMobileUserAgent() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}

if (isMobileUserAgent()) {
   window.location.replace("https://habbo.ashvalde.com");
}