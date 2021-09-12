import { useReducer } from "react";

export const useIdsReducer = (initialState: any) => {
    const [ids, updateIds] = useReducer(reducer, initialState);

    function reducer(ids: any, action: any) {
        switch(action.type) {
            case 'ADD_ID':
                return [...ids, action.id]; 
            case 'REMOVE_ID':
                const _ids = [...ids];
                const index = ids.indexOf(action.id); 
                if (index > -1) _ids.splice(index, 1);
                return _ids;
            case 'DELETE_ALL':
                return [];
            default: 
                return ids;
        }
    }

    return [ids, updateIds];
}