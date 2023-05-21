import axios from 'axios';

export const handleReplaceToLogin = () => {
    localStorage.remove("bigu-token");
    window.localStorage.clear();
    window.location.replace("localhost:3000");
  }

export const handleError = (error: any) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled");
    }
    else if (error.response && error.response.data.message) {
      if (error.response.status === 401) {
        window.alert(error.response.data.message);
        handleReplaceToLogin();
      }
      else if (error.response.status === 500) {
        window.alert(error.response.data.message);
        // window.alert("Internal server error\nTry again in feel minutes");
      }
      else if (!axios.isCancel(error)) {
        window.alert(error.response.data.message);
      }
    }
  }