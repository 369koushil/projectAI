import React from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import axiosInstance from '../src/config/axios';

function FileuploadImagekit(props) {
 const publicKey = "public_0JmVVy0WX8o2iIczrwHglwstyyE="; // Replace with your actual public key
   const urlEndpoint = "https://ik.imagekit.io/kx5q7kr95"; // Replace with your actual URL endpoin
 

  const authenticator = async () => {
    try {
      const response = await axiosInstance.get('/auth');
      console.log(response.data);

      const { expire, signature, token } = response.data;
      return { expire, signature, token }; // Return the required values
    } catch (error) {
      console.error(`Authentication request failed: ${error.message}`);
      throw new Error(error.message); // Ensure errors are properly thrown
    }
  };


  

  return (
    <div className="App">
      <p>To use this functionality, please remember to set up the server.</p>
       <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
       
       <IKUpload
            fileName={user.username}
            tags={["tag1"]}
            useUniqueFileName={true}
            isPrivateFile={false}
            onError={(err) => console.error('Upload error:', err)}
            onSuccess={(res) =>{
              user.profileUrl=res.thumbnailUrl;
               console.log('Upload successful:', res)}}
        />
      </IKContext>
    </div>
  );
}

export default FileuploadImagekit;
