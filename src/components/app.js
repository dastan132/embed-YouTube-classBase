import React from "react";
import SearchBar from "./searchBar";
import youtube from '../apis/yotubeApi';
import VideoList from "./videoList";
import VideoDetail from "./videoDetail";

class App extends React.Component{
state = { videos: [],
          selectedVideo: null         
        };

        componentDidMount(){
            this.onTermSubmit('')
        }

    onTermSubmit = async term => {
        const responce = await youtube.get('/search',{
            params: {
                q : term
            }
        });
        this.setState({
            videos: responce.data.items,
            selectedVideo: responce.data.items[0]
        });
    };

    onVideoSelect = (video) => {this.setState({selectedVideo : video})
    }
        
    render(){
        return(
            <div className="ui container">  
            <SearchBar onFormSubmit = {this.onTermSubmit} /> 
            <div className="ui grid">
            <div className="ui row">
            <div className="eleven wide column">
            <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
            </div>
            </div>
            </div>
            </div>
        )
    }
}

export default App;