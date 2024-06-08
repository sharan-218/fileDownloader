const urlInput = document.querySelector(".urlInput");
const button = document.querySelector(".submit");
button.addEventListener("click", (e) => {
  //   button.innerText = "downloading...";
  fetchFile(urlInput.value);
});

async function fetchFile(url) {
  if (url === "") {
    alert("enter URL");
  } else {
    await fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, "");
        document.body.appendChild(aTag);
        aTag.click();
        button.innerText = "Download";
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
      })
      .catch((err) => {
        alert("Error occured");
        console.log(err);
        button.innerText = "Download";
      });
  }
}
