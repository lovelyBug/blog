import React,{Component} from 'react';
import '../css/components/Reply.css';
export default class Reply extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className='reply-bloger-style'>博主回复：</div>
                <div className='reply-text-style'>good!</div>
            </div>    
        )
    }
}