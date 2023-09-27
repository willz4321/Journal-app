

export const fileUpload = async(file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/drd90e66k/upload';

    const formData = new FormData();
         formData.append('upload_preset', 'react-journal');
         formData.append('file', file);

         try {
            const resp = await fetch( cloudUrl, {
                method: 'POST',
                body: formData
            })

            if(!resp.ok) throw new Error('No se puede subir imagenes');

            const cloudResp = await resp.json();

            return cloudResp.secure_url;

       } catch (error) {
           throw new Error(error.message);
       } 
}