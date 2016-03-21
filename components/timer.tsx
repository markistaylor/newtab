import * as React from 'react';

export interface ITime {
  hours: number;
  minutes: number;
}

export default class Timer extends React.Component<any, ITime>{
  private _interval: number;
  constructor() {
    super();
    this.state = Timer._getTime();
  }

  componentDidMount() {
    this._interval = setInterval(this._setTime.bind(this), 100);
  }
  
  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    return (
      this.props.children(this.state.hours, this.state.minutes)
    )
  }
  
  private static _getTime(): ITime {
    const now = new Date();
    const hours = ((now.getHours() + 11) % 12 + 1);
    const minutes = now.getMinutes();
    
    return { hours, minutes };
  }

  private _setTime() {
    const time = Timer._getTime();
    
    if (time.minutes !== this.state.minutes || time.hours !== this.state.hours) {
      this.setState(time);
    }
  }
}
