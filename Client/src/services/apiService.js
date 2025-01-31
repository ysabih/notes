import OidcService from './authService';

class ApiService {

    backendUrl;

    constructor() {
        this.backendUrl = process.env.REACT_APP_BACKEND_URL;
    }
    
    getAllNotesAsync = async () => {
        let token = await getAccessTokenAsync();
        let response = await fetch(`${this.backendUrl}/api/notes`, {method: "GET", headers: new Headers({'Authorization': 'Bearer ' + token})});
        return (await response.json());
    }

    getNoteAsync = async (noteId) => {
        let token = await getAccessTokenAsync();
        let response = await fetch(`${this.backendUrl}/api/notes/${noteId}`, {method: "GET", headers: new Headers({'Authorization': 'Bearer ' + token})})
        if(response.status === 404){
            return null;
        }
        return (await response.json());
    }

    createNoteAsync = async (note) => {
        let token = await getAccessTokenAsync();
        let body = JSON.stringify(note);
        let response = await fetch(`${this.backendUrl}/api/notes`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                },
                body: body
            });
        if(response.status === 201){
            return (await response.json());
        }
        return null;
    }

    modifyNoteAsync = async (note) => {
        let token = await getAccessTokenAsync();
        let url = `${this.backendUrl}/api/notes/${note.id}`;
        let body = JSON.stringify(note);
        let response = await fetch(
            url, 
            {
                method: 'PUT', 
                headers: new Headers({'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}),
                body: body
            });

        if(response.status === 200){
            return (await response.json());
        }
        return null;
    }

    deleteNoteAsync = async (noteId) => {
        let token = await getAccessTokenAsync();
        let response = await fetch(`${this.backendUrl}/api/notes/${noteId}`, {method: 'DELETE', headers: new Headers({'Authorization': 'Bearer ' + token})});
        return response.status === 200;
    }

}

async function getAccessTokenAsync() {
    return (await OidcService.getUserAsync()).access_token;
}



const apiService = new ApiService();
export default apiService;