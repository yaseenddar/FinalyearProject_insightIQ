import {v2 as cloudinary} from 'cloudinary';
const fs =  require("fs")


require("dotenv").config();  
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
try {
  if(!localFilePath) return null;

  //upload the file on cloudinary
  const response = await cloudinary.uploader.upload(localFilePath,{
    resource_type:"auto"
  })
  console.log("file uploaded to the cloudinary sever",response.url);
} catch (error) {
    fs.unlinkSync(localFilePath);
}

}


cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });