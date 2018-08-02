import GlobalVariable from './GlobalVariable';
export const CalculateBlogIndex = (blogId) =>{
    for(let i = 0; i < GlobalVariable.BlogListData.length; i++){
        if(GlobalVariable.BlogListData[i].id == blogId){
            return i;
        }
    }
    return -1;
}