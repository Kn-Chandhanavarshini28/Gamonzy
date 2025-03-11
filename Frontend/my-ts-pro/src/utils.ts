import axios from 'axios'
export function doRequest(requestBody: any) {
	try {
	  const promise = axios.post(requestBody.url, requestBody.body, { headers: requestBody.headers });
	  const datapromise = promise.then((response) => response.data)
	  return datapromise;
	} catch (errors) {
	  console.error(errors);
	  return undefined; // Return undefined in case of an error
	}
  }