export const getMessages = async () => {
    return new Promise((resolve, reject) => {
        fetch('https://620120b1fdf5090017249868.mockapi.io/api/v1/messages?page=2&limit=10')
          .then(async (response) => {
            const responseJSON = await parseResponse(response);
            resolve(responseJSON);
          })
          .catch((err) => {
            reject();
          });
      });
}

const parseResponse = async (response: Response) => {
    try {
      const responseJSON = await response.json();
      return responseJSON;
    } catch (err: any) {
      console.log('Cannot parse body from response');
      return false;
    }
};