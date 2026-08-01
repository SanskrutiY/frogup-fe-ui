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

export const createNote = (note, setResponse, setError) =>{
    API({
        method: "post",
        url: "/api/froggy/note",
        data: note,
    })
    .then((response) => {
        if (response.data) {
            setResponse(response.data);
        }
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
    });
};

export const updateNote = (id, note, setResponse, setError) => {
    API({
        method: "put",
        url: `/api/froggy/note/${id}`,
        data: note,
    })
    .then((response) => {
        if (response.data) {
            setResponse(response.data);
        }
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
    });
};

export const deleteNoteById = (id, setResponse, setError) => {
    API({
        method: "delete",
        url: `/api/froggy/note/${id}`,
    })
    .then((response) => {
        setResponse(response.data);
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
    });
};

export const getNoteById = (id, setResponse, setError) => {
    API({
        method: "get",
        url: `/api/froggy/note/${id}`,
    })
    .then((response) => {
        if (response.data) {
            setResponse(response.data);
        }
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
    });
};

export const getDeletedNotes = (setResponse, setError) => {
    API({
        method: "get",
        url: "/api/froggy/note/deleted",
    })
    .then((response) => {
        if (response.data) {
            setResponse(response.data);
        }
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
    });
};

export const getByParticularDate = (date, setResponse, setError) => {
    API({
        method: "get",
        url: "/api/froggy/note/search/date",
        params: { date },
    })
    .then((response) => {
        if (response.data) {
            setResponse(response.data);
        }
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
    });
};

export const getFromParticularDate = (date, setResponse, setError) => {
    API({
        method: "get",
        url: "/api/froggy/note/search/from-date",
        params: { date },
    })
    .then((response) => {
        if (response.data) {
            setResponse(response.data);
        }
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong. Please try again.");
        }
    });
};