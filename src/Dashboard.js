import React, { Component } from 'react';
import axios from 'axios';
import Badges from './Badges';
import dummyData from './dummyData';
import Friends from './Friends';
import LifetimeStats from './LifetimeStats';
import TimeSeriesBarChart from './TimeSeriesBarChart';
import { authorizeUrl } from './api';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = dummyData;
  }

  fetchFitbitData(url, fitbitToken, stateKey) {
    axios({
      method: 'get',
      url: 'https://api.fitbit.com/1.2/user/-/' + url,
      headers: { Authorization: 'Bearer ' + fitbitToken },
      mode: 'cors'
    })
      .then(response => {
        console.log(url, response.data);
        this.setState({ [stateKey || url]: response.data });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    if (window.location.hash) {
      const urlParams = new URLSearchParams(window.location.hash);
      const fitbitToken = urlParams.get('#access_token');

      this.setState({ loggedIn: true });

      this.fetchFitbitData('profile.json', fitbitToken, 'user');
      this.fetchFitbitData('activities.json', fitbitToken, 'lifetimeStats');
      this.fetchFitbitData('badges.json', fitbitToken, 'badges');
      this.fetchFitbitData(
        'activities/steps/date/today/1m.json',
        fitbitToken,
        'steps'
      );
      this.fetchFitbitData(
        'activities/distance/date/today/1m.json',
        fitbitToken,
        'distance'
      );
      this.fetchFitbitData('friends.json', fitbitToken);
      this.fetchFitbitData('/sleep/date/2019-12-31.json', fitbitToken);
      this.fetchFitbitData('/sleep/goal.json', fitbitToken);
      this.fetchFitbitData(
        '/sleep/date/2019-11-01/2019-12-01.json',
        fitbitToken
      );
      this.fetchFitbitData('/activities/date/2019-12-10.json', fitbitToken);
      this.fetchFitbitData('devices.json', fitbitToken);

      this.fetchFitbitData('/body/log/fat/date/2019-12-30.json', fitbitToken);
    }
  }

  render() {
    return (
      <div className="container">
        <header className="text-center">
          <span className="pull-right">{this.state.user.user.displayName}</span>
          <h1 className="page-header">React Fit</h1>
          <p className="lead">Your personal fitness dashboard</p>
        </header>

        {!this.state.loggedIn && (
          <div className="row text-center">
            <a href={authorizeUrl}>Log in with fitbit</a>
          </div>
        )}

        <div className="row">
          <div className="col-lg-3">
            <LifetimeStats lifetimeStats={this.state.lifetimeStats} />
            <Badges badges={this.state.badges} />
          </div>

          <div className="col-lg-6">
            <TimeSeriesBarChart
              data={this.state.steps['activities-steps']}
              title="Steps"
              yMax={1000}
            />
            <TimeSeriesBarChart
              data={this.state.distance['activities-distance']}
              title="Distance (kilometers)"
              yMax={2}
            />
          </div>

          <div className="col-lg-2 col-lg-offset-1">
            <Friends friends={this.state.friends.friends} />
          </div>
        </div>
        <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
      </div>
    );
  }
}

export default Dashboard;
