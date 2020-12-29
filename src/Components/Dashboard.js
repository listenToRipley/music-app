import React, {Component} from 'react'
import NavBar from './NavBar';
import {Card, CardContent, MenuItem, Switch, Slider, Select} from "@material-ui/core"
import './Dash.css'

const offlineNote = "Your application is offline. You won't be able to share or stream music to other devices"
const volumeNote =  "Listening to music at a high volume could cause long-term hearing loss."
const qualityNote =  "Music quality is degraded. Increase quality if your connection allows it."

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      online: true,
      currentVolumn: 0,
      quality: 2,
      messages:[]
    }
  }

  onlineHandler = (e) => {
    console.log('before,', this.state.message)
    e.preventDefault();
    this.setState({
      online: !this.state.online
    }, () => {
      if(this.state.online === false) {
        this.setState({
          messages: [...this.state.messages, offlineNote]
        }) 
      } else if (this.state.online === true) {
        let messageIndex = this.state.messages.indexOf(offlineNote)
        let messageCopy = [...this.state.messages]
          messageCopy.splice(messageIndex, 1)
          this.setState({
            messages: messageCopy
        })
      }
    })
    console.log('after,', this.state.messages)
  }

  slideHandler = (e, v) => {
    e.preventDefault();
    this.setState({
      currentVolumn: v
    }, () => {
      if (this.state.currentVolumn >= 80 && (this.state.messages.includes(volumeNote) === false)) {
        this.setState({
          messages: [...this.state.messages, volumeNote]
        }) 
      } else if (this.state.currentVolumn < 80) {
        let messageIndex = this.state.messages.indexOf(volumeNote)
        let messageCopy = [...this.state.messages]
        messageCopy.splice(messageIndex, 1)
        this.setState({
          messages: messageCopy
      })
      }
    })
  }

  qualityHandler = (e) => {
    e.preventDefault();

    let int = parseInt(e.target.value)
    this.setState({
      quality: int
    }, () => {
      if (this.state.quality === 1) {
        this.setState({
          messages: [...this.state.messages, qualityNote]
        })
      } else {
        let messageIndex = this.state.messages.indexOf(qualityNote)
        let messageCopy = [...this.state.messages]
        messageCopy.splice(messageIndex, 1)
        this.setState({
          messages: messageCopy
      })
      }
    })
  }
  
  render() {
    return(
      <div>
       <NavBar />
        <h1>Welcome {this.state.user}</h1>

       <div className="card-wrapper">
          <Card className="online" variant="outlined">
              <CardContent>
                <h1>Online Mode</h1>
                <p>Is this application connected to the internet?</p>
                 <Switch
                   onClick={this.onlineHandler} 
                   checked={this.state.online}
                   />
              </CardContent>
          </Card>

          <Card className="volumn" variant="outlined">
              <CardContent>
                <h1>Master Volumn</h1>
                <p>Overrides all other sound settings in this application</p>
                  <Slider
                    onChange={this.slideHandler}
                    defaultValue={30}
                    step={10}
                    marks
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                  />
              </CardContent>
          </Card>
              
          <Card className="quality" variant="outlined">
              <CardContent>
                <h1>Sound Quality</h1>
                <p>Manually control the music quality in the event of poor connection</p>
                <Select onChange={this.qualityHandler} defaultValue={this.state.quality}>
                  <MenuItem value="1">Low</MenuItem>
                  <MenuItem value="2">Normal</MenuItem>
                  <MenuItem value="3">High</MenuItem>
                </Select>
              </CardContent>
          </Card>
       </div>

       <h2>System Notifications</h2>
        <ul>
          {this.state.messages.map((item, i) => { return <li key={i}>{item}</li> })}
        </ul>
      </div>
    )
  }
}

export default Dashboard