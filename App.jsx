import { useEffect, useState } from 'react'
import './App.css'

function App() {


  const [faceSwap, setfaceSwap] = useState([])
  const [insert_datasets_oneId, setinsert_datasets_oneId] = useState("")
  const [uploadData, setUploadData] = useState()



  const faceSwapCreation = async() => {
    const res = await fetch("https://cloud.leonardo.ai/api/rest/v1/datasets",
    {
      method: "POST",
      headers:{
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer 84552002-2989-4556-8b54-6a109a55f65f"
    },
    body: JSON.stringify({
      
        "name": faceSwap,
        "description": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3"
        
    })

    }
    )
    const data = await res.json()
    console.log(data)
    setinsert_datasets_oneId(data.insert_datasets_one.id)
    console.log(data.insert_datasets_one.id)
  }

  useEffect(() => {
      if (!insert_datasets_oneId) return;
  
      const interval2 = setInterval(async() => {
        const res =  await fetch(`https://cloud.leonardo.ai/api/rest/v1/datasets/${insert_datasets_oneId}`,{
        headers:{
          "accept": "application/json",
          "authorization": "Bearer 84552002-2989-4556-8b54-6a109a55f65f"
      },})
        const data = await res.json();

  
        console.log(data)
        // setImages(data.datasets_by_pk)
        clearInterval(interval2);
        
        
      }, 1500);
      return () => clearInterval(interval2)
    }, [insert_datasets_oneId])


    const dataset = async() => {

      // const rawFields = response.dataset.fields;
	    // const fields = JSON.parse(rawFields);
	    // const url = response.dataset.url;

      const formData = new FormData();

      Object.entries({ ...fields, uploadData }).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      const res = await fetch(`https://cloud.leonardo.ai/api/rest/v1/datasets/${insert_datasets_oneId}/upload`,
    {
      method: "POST",
      headers:{
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer 84552002-2989-4556-8b54-6a109a55f65f"
    },
    body: JSON.stringify({
      
        "extension": "png/jpg/jpeg"
        
    })

    }
    )
    const data = await res.json();
    console.log(data)
    
    }




  return (
    <>
    
   
    <input type='text' placeholder='Faceswap-name' onChange={(e) => setfaceSwap(e.target.value) }></input>
     <button onClick={faceSwapCreation}>Faceswap</button>
    <input type='file' placeholder='Faceswap-fotos' accept='image/png, image/jpg, image/jpeg' onChange={(e) => setUploadData(URL.createObjectURL(e.target.files[0])) }></input>
     <button onClick={dataset}>uploadImages</button>
     <img src={uploadData} alt="" />

    </>
  )
}

export default App
