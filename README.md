# Journal-app

Para poder cargar y subir imaneges se debe utilizar una cuenta de cloudinary y crear un archivo js en la carpeta api,
de la siguiente manera y que contenga los datos necesarios:



export const fileUpload = async(file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/Cloud-Name/upload';

    const formData = new FormData();
         formData.append('upload_preset', 'nombre-del-proyecto-en-cloud');
         formData.append('file', file);

         try {
            const resp = await fetch( cloudUrl, {
                method: 'POST',
                body: formData
            })

            console.log(resp);
            if(!resp.ok) throw new Error('No se puede subir imagenes');

            const cloudResp = await resp.json();
            console.log({cloudResp})

            return cloudResp.secure_url;

       } catch (error) {
           throw new Error(error.message);
       } 
}