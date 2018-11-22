import React, {Component} from 'react'
import Api from "../../utils/interaction";

class CreatorScene extends Component {
    constructor(props){
        super(props)
        this.state = {
            fundings:null
        }
    }

    componentDidMount() {
       Api.createFunding('SuperMM',99,10000)
           .then(result =>  console.table(result))
           .catch(e => console.log(e))

    }
    render() {
        const { fundings } = this.state
        return (
            <div>
                <p>我发起的众筹</p>
                {
                    fundings && <p>fundings</p>
                }
            </div>
        );
    }
}

export default CreatorScene;