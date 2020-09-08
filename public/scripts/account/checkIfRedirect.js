if(sessionStorage.getItem("redirectURL"))
{
  const url = sessionStorage.getItem("redirectURL");
  sessionStorage.removeItem("redirectURL");
  location.href = url;
}
