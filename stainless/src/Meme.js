import React,{Component} from 'react'
import * as domtoimagemore from 'dom-to-image-more'
// import { saveAs } from 'file-saver'
import Draggable from 'react-draggable';
class Meme extends Component{
	constructor(){
		super()
		this.state = {
			 activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: -400
    },
			toText: "",
			boText:"",
			Rno:"https://i.imgflip.com/1bgs.jpg",
			meme:[]
		}
		this.handChange=this.handChange.bind(this)
		this.handSub=this.handSub.bind(this)
	}
	componentDidMount(){
		fetch("https://api.imgflip.com/get_memes")
		.then(response => response.json())
		.then(response=>{
			const {memes} = response.data
			this.setState({meme: memes})
		})
	}
	handChange(event){
		const {name, value} =  event.target
		this.setState({
			[name]: value
		})
	}
	handSub(event){
		event.preventDefault()
		const RandNu = Math.floor(Math.random() * this.state.meme.length)
		const Rando = this.state.meme[RandNu].url
		this.setState({Rno: Rando})
	//console.log(this.state.Rno)

	}
	printDocument() {
    domtoimagemore.toBlob(document.getElementById('meme'))
    .then(function (blob) {
        window.saveAs(blob, 'meme.jpeg');
    });
        }
      handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    // this.setState({activeDrags: ++this.state.activeDrags});
  };

  onStop = () => {
    // this.setState({activeDrags: --this.state.activeDrags});
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };


	render(){
		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
		return(
			<div className="form">
			<form className="meme-form">
			<input type="text" name="toText" value={this.state.toText} onChange={this.handChange} placeholder="Top" />
			<input type="text" name="boText" value={this.state.boText} onChange={this.handChange} placeholder="Bottom" />
			</form>
			<div className="meme" id="meme">
			<img src={this.state.Rno} alt="Meme From ImgFlip Api" />
			<Draggable onDrag={this.handleDrag} bounds={{top: -100, left: -100, right: 100, bottom: 100}} positionOffset={{x: '-50%', y: '-50%'}}  {...dragHandlers}>
			<h2  className="top">{this.state.toText}</h2>
			</Draggable>

			<Draggable  onDrag={this.handleDrag} bounds={{top: -100, left: -100, right: 100, bottom: 100}} positionOffset={{x: '-50%', y: '-50%'}} {...dragHandlers}>
			<h2 className="bottom">{this.state.boText}</h2>
			</Draggable >
			</div>
			<div className="download">
			<form onSubmit={this.handSub} className="rano" >		
			<button className="bt">random</button>
			</form>
			<br/> 
			<br/>
            <button className="bt" onClick={this.printDocument}>DOWNLOAD</button>
			</div>
			</div>
			)
	}
}
export default Meme