const authReducer = (state, action)=>{
    switch(action.type){
        case 'SAVE_TOKEN':
            return action.token;
        case 'CLEAR_TOKEN':
            return '';
        default:
            return state;
    }
};

export default authReducer;