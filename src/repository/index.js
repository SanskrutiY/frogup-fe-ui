import API from "../services/axiosHelper";

export const getAllNotes = (setResponse, setError) => {
    API({
        method:'get',
        url:'/api/froggy/note'
    }).then(response => 
        {
        if (response.data) {
            setResponse(response.data);
        }
        }
    ).catch(error => 
        {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
        }
    );
};

export const createNote = (setResponse, setError) =>{
    
}


