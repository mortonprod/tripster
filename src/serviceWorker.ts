import { initializeStorageWithDefaults } from './storage';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  await initializeStorageWithDefaults({});

  console.log('Extension successfully installed!');

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("background.js got a message")
      console.log(request);
      console.log(sender);
      console.log(sender.tab.id);
      chrome.tabs.sendMessage(sender.tab.id, request);
      sendResponse("bar");
    }
  );
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});

// const img = new Image();

async function fetchResource(pathToResource) {
  try {
    const response = await fetch(pathToResource);
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.log('Looks like there was a problem: ', error);
  }
}

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

function showImage(responseAsBlob) {
  blobToBase64(responseAsBlob).then((res)=>{
    console.log(`baseblah: ${res}`);
  })
  // const imgUrl = URL.createObjectURL(responseAsBlob);
  // img.src = imgUrl;
	// img.onload = () => {
	// 	ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
	// 	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	// }
}
async function get(){
	// Uses the same fetchResource function as shown in previous examples
  console.log('Fetch...')
	const response = await fetchResource('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
	if (response) {
		showImage(await response.blob());
	}
}

get();
