// export const anotherName = (name)=>{
//     return {
//         type : 'CHANGE_NAME',
//          payload : name
//     }
// }

export const anotherName = (name)=>{
        return (dispatch)=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res=>res.json())
            .then(res2=>{
                dispatch({type : 'CHANGE_NAME',payload : res2[0].name})
            })
        }
    }

    export const changeProjectTitle = ()=>{
        return {
            type : 'CHANGE_PROJECT_TITLE',
            payload : 'Project3'
        }
    }
    export const changeClient = ()=>{
        return {
            type : 'CHANGE_CLIENT',
            payload : 'Project3'
        }
    }
    export const changeStatus = ()=>{
        return {
            type : 'CHANGE_STATUS',
            payload : 'Project3'
        }
    }
    export const changeFirstName = ()=>{
        return {
            type : 'CHANGE_FIRST_NAME',
            payload : 'Project3'
        }
    }
    export const changeLastName = ()=>{
        return {
            type : 'CHANGE_LAST_NAME',
            payload : 'Project3'
        }
    }
    export const changeCompanyName = ()=>{
        return {
            type : 'CHANGE_COMPANY_NAME',
            payload : 'Project3'
        }
    }
    export const changeEmail = ()=>{
        return {
            type : 'CHANGE_PROJEC',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }
    export const changeProject = ()=>{
        return {
            type : 'CHANGE_PROJECT',
            payload : 'Project3'
        }
    }